import type { DNSHostedZone } from './types';

interface Status {
  dns: 'created' | 'propagating' | 'propagated';
}

const getStatus = (dns: DNSHostedZone): Status => {
  return {
    dns: !dns.ns_ok ? dns.status : 'propagated'
  }
}

export default getStatus;