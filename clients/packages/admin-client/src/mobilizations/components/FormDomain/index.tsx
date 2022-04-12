import React from 'react';
import { Text, Stack } from 'bonde-components/chakra';
import FormPanel from './FormPanel';

const FormDomain = ({ mobilization, hostedZones }) => (
  <Stack direction="row">
    <Stack direction="column" spacing={8}>
      <Text>Defina abaixo o domínio (endereço / URL) para as pessoas acessarem sua página:</Text>
      <FormPanel mobilization={mobilization} hostedZones={hostedZones} />
    </Stack>
  </Stack>
);

export default FormDomain;