import React from 'react';
import { Stack, Input, ListItem, OrderedList, Text, Button, Heading, Flex } from 'bonde-components/chakra';
import { Field, Form } from 'bonde-components/form';

interface Properties {
  customDomain?: string;
  onSubmit: ({ customDomain }) => Promise<void>;
}

const ExternalDomainForm: React.FC<Properties> = ({ customDomain, onSubmit }) => (
  <Form
    onSubmit={onSubmit}
    initialValues={customDomain ? {customDomain: customDomain.replace('www.', '')} : null}
  >
    {({ handleSubmit }) => (
      <form onSubmit={handleSubmit}>
        <Stack >
          <Text>Insira abaixo o domínio, salve as alterações e siga o passo a passo para configurá-lo:</Text>
          <Flex bg="gray.100">
            <Text ml={3} mt={0.5}>https://www.</Text>
            <Field name="customDomain">{({ input }) => <Input {...input} ml={1} mb={1} placeholder='seudominio.org' />}</Field>
          </Flex>
        </Stack>

        <Stack>
          <Heading
            fontWeight="semibold"
            fontSize="sm"
            textTransform="uppercase"
            mt={8}
          >
            Passo a passo para configurar o DNS
          </Heading>
          <OrderedList>
            <ListItem>Abra o site onde você comprou o domínio (GoDaddy.com, por exemplo);</ListItem>
            <ListItem>Entre nas configurações do domínio que você inseriu no BONDE;</ListItem>
            <ListItem>Procure a opção "Manage DNS" e clique nela;</ListItem>
            <ListItem>Em "Records", clique em "add", no canto inferior direito;</ListItem>
            <ListItem>Selecione "A", em "Type";</ListItem>
            <ListItem>Em "Host", escreva o subdomínio com e sem "www";</ListItem>
            <ListItem>Em "Points to", preencha com o seguinte IP: 54.156.173.29</ListItem>
            <ListItem>Em "TTL", selecione "¹/² hour" e clique em "save";</ListItem>
          </OrderedList>
          <Button type='submit' maxW={32}>Salvar</Button>
        </Stack>
      </form>
    )}
  </Form >
);

export default ExternalDomainForm;
