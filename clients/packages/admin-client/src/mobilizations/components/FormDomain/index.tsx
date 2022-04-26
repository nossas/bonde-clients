import React from 'react';
import { Text, Stack } from 'bonde-components/chakra';
import { FormPanel } from './FormPanel';
import CertificateStatus from './CertificateStatus';

const FormDomain = ({ mobilization, hostedZones }) => (
  <Stack direction="row" spacing={140} maxW="1900px">
    <Stack direction="column" spacing={8}>
      <Text>Defina abaixo o domínio (endereço / URL) para as pessoas acessarem sua página:</Text>
      <FormPanel mobilization={mobilization} hostedZones={hostedZones} />
      <CertificateStatus customDomain={mobilization.custom_domain} hostedZones={hostedZones} />
    </Stack>
  </Stack>
);

export default FormDomain;
