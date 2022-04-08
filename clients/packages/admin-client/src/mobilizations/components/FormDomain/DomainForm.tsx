import React from 'react';
import { HStack, VStack, Text, Select, Link } from 'bonde-components/chakra';
import { Field } from 'bonde-components/form';

interface Properties {
  createNewDomainPath?: string;
  hostedZones?: { domain_name: string }[];
}

const DomainForm: React.FC<Properties> = ({ createNewDomainPath, hostedZones = [] }) => (
  <VStack>
    <Text>Selecione o domínio cadastrado na sua comunidade:</Text>
    <HStack>
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
    </HStack>
    <Text>Não encontro o domínio na lista?</Text>
    <Text><Link href={createNewDomainPath || '#'} target='_self' >Clique aqui</Link> para cadastrar um novo domínio na comunidade.</Text>
  </VStack>
);

export default DomainForm;