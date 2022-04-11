import React from 'react';
import { Stack, Text, Select, Link } from 'bonde-components/chakra';
import { Field } from 'bonde-components/form';

interface Properties {
  createNewDomainPath?: string;
  hostedZones?: { domain_name: string }[];
}

const DomainForm: React.FC<Properties> = ({ createNewDomainPath, hostedZones = [] }) => (
  <Stack direction="column">
    <Text>Selecione o domínio cadastrado na sua comunidade:</Text>
    <Stack direction="row" bg="gray.100">
      <Text>https://www.</Text>
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
    <Text>Não encontro o domínio na lista?</Text>
    <Text><Link href={createNewDomainPath || '#'} target='_self' >Clique aqui</Link> para cadastrar um novo domínio na comunidade.</Text>
  </Stack>
);

export default DomainForm;