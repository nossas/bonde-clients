import React from 'react';
import { HStack, VStack, Text, Input, Select } from 'bonde-components/chakra';
import { Field } from 'bonde-components/form';

interface Properties {
  hostedZones?: { domain_name: string }[];
}

const SubdomainForm: React.FC<Properties> = ({ hostedZones = [] }) => (
  <VStack>
    <Text>Personalize o subdomínio abaixo e clique em salvar para gerar o certificado.</Text>
    <HStack bg="gray.100">
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
    </HStack>
  </VStack>
);

export default SubdomainForm;