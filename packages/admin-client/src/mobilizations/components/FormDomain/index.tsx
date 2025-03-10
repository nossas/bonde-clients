import React from 'react';
import { Stack } from 'bonde-components/chakra';
import FormPanel from './FormPanel';

const FormDomain = ({ mobilization, hostedZones, updateMobilization }) => (
  <Stack direction="row" spacing={140} maxW="1900px">
    <Stack direction="column" spacing={8}>
      <FormPanel mobilization={mobilization} hostedZones={hostedZones} updateMobilization={updateMobilization} />
    </Stack>
  </Stack>
);

export default FormDomain;
