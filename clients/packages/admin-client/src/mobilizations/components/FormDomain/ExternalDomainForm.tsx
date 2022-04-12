import React from 'react';
import { Stack, Input, ListItem, OrderedList, Text, Button } from 'bonde-components/chakra';
import { Field, Form } from 'bonde-components/form';

interface Properties {
  customDomain?: string;
  onSubmit: ({ customDomain }) => Promise<void>;
}

const ExternalDomainForm: React.FC<Properties> = ({ customDomain, onSubmit }) => (
  <Form initialValues={customDomain ? customDomain.replace('www.', '') : null} onSubmit={onSubmit}>
    {({ handleSubmit }) => (
      <form onSubmit={handleSubmit}>
        <Stack direction="column">
          <Text>Insira abaixo o domínio, salve as alterações e siga o passo a passo para configurá-lo:</Text>
          <Stack direction="row">
            <Text>https://www.</Text>
            <Field name="customDomain">{({ input }) => <Input {...input} placeholder='seudominio.org' />}</Field>
          </Stack>
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
          <Button type='submit'>Salvar</Button>
        </Stack>
      </form>
    )}
  </Form>
);

export default ExternalDomainForm;