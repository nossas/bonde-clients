import React from 'react';
import { Flex, Stack, Text, Box } from 'bonde-components/chakra';
import { InsertDomain, ConnectDomain, PropagateDomain, CertifyDomain, ActiveDomain } from './DomainSteps'
import { DNSHostedZone } from '../types';

type Props = {
  dnsHostedZone: DNSHostedZone
  dnsIsActivated: boolean
}

const Explain: React.FC<Props> = ({ dnsHostedZone, dnsIsActivated }) => {
  return (
    <Stack direction="column" spacing={2}>
      <Text fontWeight="semibold" fontSize="13px" textTransform="uppercase">
        {!dnsIsActivated ? 'Entenda o processo' : 'Detalhes'}
      </Text>

      <Flex bg="white" px={4} py={6} justifyContent="space-around">
        <InsertDomain />

        <ConnectDomain />

        {dnsHostedZone.status != 'propagated' || !dnsHostedZone.ns_ok ?
          <PropagateDomain /> :
          <Box opacity="45%">
            <PropagateDomain />
          </Box>
        }

        {<PropagateDomain /> ?
          <Box opacity="45%">
            <CertifyDomain />
          </Box>
          : <CertifyDomain />
        }

        {dnsHostedZone.certificates?.length > 0
          ? <ActiveDomain />
          : <Box opacity="45%">
            <ActiveDomain />
          </Box>
        }
      </Flex>
    </Stack>
  );
}

export default Explain;
