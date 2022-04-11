import React from 'react';
import { Button, Stack, Text, Input, Select } from 'bonde-components/chakra';
import { Form, Field } from 'bonde-components/form';

interface Properties {
  hostedZones?: { domain_name: string }[];
}

const SubdomainForm: React.FC<Properties> = ({ hostedZones = [] }) => (
  <Form onSubmit={(values) => console.log(values)}>
  {({ handleSubmit }) => (
    <form onSubmit={handleSubmit}>
      <Stack direction="column">
        <Text>Personalize o subdomínio abaixo e clique em salvar para gerar o certificado.</Text>
        <Stack direction="row" bg="gray.100">
          <Text>https://wwww.</Text>
          <Field name="subdomain">
            {({ input }) => <Input {...input} placeholder="escreva seu subdomínio" />}
          </Field>
          <Field name="domain">
            {({ input }) => (
              <Select {...input} placeholder="selecione um domínio">
                {hostedZones.map(({ domain_name: domain }) =>
                  <option key={domain}>{domain}</option>
                )}
              </Select>
            )}
          </Field>
        </Stack>
        <Button type='submit'>Salvar</Button>
      </Stack>
    </form>
  )}
  </Form>
);

export default SubdomainForm;