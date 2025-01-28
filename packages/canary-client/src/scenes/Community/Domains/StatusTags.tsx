import React from 'react';
import {
  HStack,
  Tag
} from 'bonde-components/chakra';
import getStatus from './getStatus';
import type { DNSHostedZone } from './types';

const StatusTags: React.FC<{ dnsHostedZone: DNSHostedZone }> = ({ dnsHostedZone }) => {
  const { dns } = getStatus(dnsHostedZone);

  if (dns === 'created') {
    return <Tag colorScheme="red">Configuração pendente</Tag>;
  }

  return (
    <HStack>
      {dns === 'propagated' ? <Tag colorScheme="green">Propagado</Tag> : <Tag colorScheme="yellow">Propagando</Tag>}
    </HStack>
  );
}

export default StatusTags;