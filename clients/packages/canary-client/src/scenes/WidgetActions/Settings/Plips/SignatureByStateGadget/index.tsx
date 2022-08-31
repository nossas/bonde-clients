import React from 'react';
import { Box, Stack, Table, Tbody, Td, Tr } from 'bonde-components/chakra';
import Percent, { percentage } from '../components/Percent';
import { Header } from "../../../../../components/CardWithHeader";

import Eleitorado from './Eleitorado';

interface RowProps {
  state: string
  confirmedSignatures?: number
}

const SignatureByStateRow: React.FC<RowProps> = ({
  state,
  confirmedSignatures = 0
}) => (
  <Tr>
    <Td>{state}</Td>
    <Td>{confirmedSignatures}</Td>
    <Td>
      <Percent
        value={confirmedSignatures}
        total={Eleitorado.states[state]}
      />
    </Td>
  </Tr>
);

interface GadgetProps {
  isMobile?: boolean
  signatureByState: {
    state: string,
    confirmed_signatures?: number
  }[]
}

const SignatureByStateGadget: React.FC<GadgetProps> = ({
  isMobile,
  signatureByState
}) => {
  return (
    <Stack>
      <Header label="Total por estado" />
      <Box bg="white">
        <Table>
          <Tbody>
            {signatureByState
              .filter((ss) => !!ss.state)
              .sort((a, b) => {
                const bpercent = percentage(
                  b.confirmed_signatures,
                  Eleitorado.states[b.state] * Eleitorado.goal.state
                );
                const apercent = percentage(
                  a.confirmed_signatures,
                  Eleitorado.states[a.state] * Eleitorado.goal.state
                );
                
                return bpercent - apercent
              })
              .splice(0, isMobile ? 5 : 7)
              // eslint-disable-next-line react/display-name
              .map((ss, index) =>
                <SignatureByStateRow
                  key={index}
                  state={ss.state}
                  confirmedSignatures={ss.confirmed_signatures} />
              )}
          </Tbody>
        </Table>
      </Box>
    </Stack>
  );
}

export default SignatureByStateGadget;