import React from 'react';
import { Stack, Text, Select, Link, Button } from 'bonde-components/chakra';
import { Form, Field } from 'bonde-components/form';

interface Properties {
  createNewDomainPath?: string;
  onSubmit: ({ customDomain }) => Promise<void>;
  hostedZones?: { domain_name: string }[];
}

const DomainForm: React.FC<Properties> = ({ createNewDomainPath, onSubmit, hostedZones = [] }) => (
  <Form onSubmit={onSubmit}>
  {({ handleSubmit }) => (
    <form onSubmit={handleSubmit}>
      <Stack direction="column">
        <Text>Selecione o domínio cadastrado na sua comunidade:</Text>
        <Stack direction="row" bg="gray.100">
          <Text>https://www.</Text>
          <Field name="customDomain">
            {({ input }) => (
              <Select {...input} placeholder="selecione um domínio">
                {hostedZones.map(({ domain_name: domain }) =>
                  <option key={domain}>{domain}</option>
                )}
              </Select>
            )}
          </Field>
        </Stack>
        <Text>Não encontro o domínio na lista?</Text>
        <Text><Link href={createNewDomainPath || '#'} target='_self' >Clique aqui</Link> para cadastrar um novo domínio na comunidade.</Text>
        <Button type="submit">Salvar</Button>
      </Stack>
    </form>
  )}
  </Form>
);

export default DomainForm;