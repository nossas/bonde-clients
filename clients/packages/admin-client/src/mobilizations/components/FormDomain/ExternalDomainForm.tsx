import React from 'react';
import { HStack, Input, ListItem, OrderedList, Text, VStack } from 'bonde-components/chakra';
import { Field } from 'bonde-components/form';

export default () => (
  <VStack>
    <Text>Insira abaixo o domínio, salve as alterações e siga o passo a passo para configurá-lo:</Text>
    <HStack>
      <Text>https://www.</Text>
      <Field name="domain">{({ input }) => <Input {...input} placeholder='seudominio.org' />}</Field>
    </HStack>
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
  </VStack>
);