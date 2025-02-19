import type { DNSHostedZone } from './types';
import getStatus from './getStatus';

describe('Domain getStatus', () => {
  const dns: DNSHostedZone = {
    id: 23,
    domain_name: 'bonde.org',
    status: 'created',
    community: {
      id: 2,
      name: 'Test'
    },
    hosted_zone: {},
    name_servers: [],
    dns_records: [],
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  }

  it('should return a first Status to check DNS', () => {
    expect(getStatus(dns)).toEqual({
      dns: 'created'
    });
  });

  it('should return a Status with propagating', () => {
    expect(getStatus({ ...dns, status: 'propagating' })).toEqual({
      dns: 'propagating'
    });
  });

  it('should return a Status with propagated', () => {
    expect(getStatus({ ...dns, ns_ok: true })).toEqual({
      dns: 'propagated'
    });
  });
});