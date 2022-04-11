import React from 'react';
import { Stack, Text, Input, Select } from 'bonde-components/chakra';
import { Field } from 'bonde-components/form';

interface Properties {
  hostedZones?: { domain_name: string }[];
}

const SubdomainForm: React.FC<Properties> = ({ hostedZones = [] }) => (
  <Stack direction="column">
    <Text>Personalize o subdomínio abaixo e clique em salvar para gerar o certificado.</Text>
    <Stack direction="row" bg="gray.100">
      <Text>https://wwww.</Text>
      <Field name="subdomain">
        {({ input }) => <Input {...input} placeholder="escreva seu subdomínio" />}
      </Field>
      <Field name="domain">
        {({ input }) => (
          <Select {...input}>
            {hostedZones.map(({ domain_name: domain }) =>
              <option key={domain}>{domain}</option>
            )}
          </Select>
        )}
      </Field>
    </Stack>
  </Stack>
);

export default SubdomainForm;