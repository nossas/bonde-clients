import React from 'react';
import { Link } from 'react-router-dom';
import { Header, Text, Icon, Grid, GridItem, Box, Flex } from 'bonde-components';
import { Status } from './Styles';
import CreateDomainModal from './CreateDomainModal';

type Certificate = {
  is_active: boolean
}

type DNSHostedZone = {
  id: number
  domain_name: string
  name_servers?: string[]
  ns_ok?: boolean
  certificates?: Certificate[]
  status: 'created' | 'propagating' | 'propagated' | 'certifying' | 'certified'
}

type DomainsProps = {
  refetch: any
  dnsHostedZones: DNSHostedZone[]
}

const Domains = ({ dnsHostedZones, refetch }: DomainsProps) => (
  <>
    <Flex direction="row" justify="space-between">
      <div>
        <Header.H3>Domínios</Header.H3>
        <Text>Aqui você gerencia os Domínios (URLs customizadas) das páginas da sua comunidade.</Text>
      </div>
      <CreateDomainModal btnText='Adicionar domínio' refetch={refetch} />
    </Flex>
    <Box py={4}>
      <Grid templateColumns='500px auto 70px' gap={4}>
        <GridItem>
          <Text>Domínio</Text>
        </GridItem>
        <GridItem colSpan={2}>
          <Text>Status</Text>
        </GridItem>
      </Grid>
    </Box>
    {dnsHostedZones.map((dnsHostedZone: DNSHostedZone, index: number) => (
      <Link key={`dns-hosted-zone-${index}`} to={`/community/domains/${dnsHostedZone.id}`}>
        <Box bg="white" p={4} borderBottomWidth={1} borderColor="gray.100">
          <Grid key={`domain-item-${index}`} templateColumns='500px auto 70px' gap={4}>
            <GridItem>
              <Text bold>{dnsHostedZone.domain_name}</Text>
            </GridItem>
            <GridItem>
              <Status
                activeStatus='propagated'
                inactiveStatus='created'
                value={dnsHostedZone.status === 'propagated' || dnsHostedZone.ns_ok ? 'propagated' : dnsHostedZone.status}
                labels={{
                  created: 'Aguardando configurar DNS',
                  propagating: 'Propagando',
                  propagated: 'Propagado'
                }}
              />
            </GridItem>
            <GridItem>
              <Icon size='small' name='ArrowRight' />
            </GridItem>
          </Grid>
        </Box>
      </Link>
    ))}
  </>
);

export default Domains;