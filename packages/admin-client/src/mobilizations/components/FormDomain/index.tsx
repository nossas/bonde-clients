import React from 'react';
import { Text, Stack } from 'bonde-components/chakra';
import FormPanel from './FormPanel';

const FormDomain = ({ mobilization, hostedZones }) => (
  <Stack direction="row" spacing={140} maxW="1900px">
    <Stack direction="column" spacing={8}>
      <Text>Defina um domínio personalizado para sua página. Você pode inserir como um domínio principal ou um subdomínio. O domínio principal precisa ter sido previamente configurado na sua comunidade do BONDE, mas você pode criar subdomínios livremente a partir dele.</Text>
      <FormPanel mobilization={mobilization} hostedZones={hostedZones} />
    </Stack>
  </Stack>
);

export default FormDomain;
