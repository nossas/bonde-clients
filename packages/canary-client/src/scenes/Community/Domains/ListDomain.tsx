import React from 'react';
import { Container, Row, Col } from 'react-grid-system';
import { Link } from 'react-router-dom';
import { Header, Text, Icon } from 'bonde-components';
import { DNS as DTRow, Col as DTCol, Status, List as DTList } from './Styles';
import CreateDomainFlow from './CreateDomainFlow';

type Certificate = {
  is_active: boolean
}

type DNSHostedZone = {
  id: number
  domain_name: string
  name_servers?: string[]
  ns_ok?: boolean
  certificates?: Certificate[]
}

type Props = {
  dnsHostedZone: DNSHostedZone
}

const Domain = ({ dnsHostedZone }: Props) => {
  return (
    <Link to={`/community/domains/${dnsHostedZone.id}`}>
      <DTRow>
        <DTCol>
          <Header.H4>{dnsHostedZone.domain_name}</Header.H4>
        </DTCol>
        <DTCol>
          <Status
            value={dnsHostedZone.ns_ok ? 'active' : 'inactive'}
            labels={{ 'active': 'Ativo', 'inactive': 'Inativo' }}
          />
        </DTCol>
        <DTCol>
          <Icon name='ArrowRight' />
        </DTCol>
      </DTRow>
    </Link>
  );
}

type DomainsProps = {
  dnsHostedZones: DNSHostedZone[]
}

const Domains = ({ dnsHostedZones }: DomainsProps) => (
  <Container fluid style={{ width: '100%', padding: '0' }}>
    <Row>
      <Col xs={12} sm={8} md={9} lg={10}>
        <Header.H3>Domínios</Header.H3>
        <Text>Aqui você gerencia os Domínios (URLs customizadas) das páginas da sua comunidade.</Text>
      </Col>
      <Col xs={12} sm={4} md={3} lg={2}>
        <CreateDomainFlow btnText='Adicionar domínio' />
      </Col>
    </Row>
    <DTList>
      <DTRow header>
        <DTCol>
          <Header.H5>Domínio</Header.H5>
        </DTCol>
        <DTCol>
          <Header.H5>Status</Header.H5>
        </DTCol>
        <DTCol />
      </DTRow>
      {dnsHostedZones.map((dnsHostedZone: DNSHostedZone, index: number) => (
        <Domain key={index} dnsHostedZone={dnsHostedZone} />
      ))}
    </DTList>
  </Container>
);

export default Domains;