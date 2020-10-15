import React from 'react';
import { Container, Row, Col } from 'react-grid-system';
import { Link } from 'react-router-dom';
import { Button, Header, Text, Icon } from 'bonde-components';
import { DNS as DTRow, Col as DTCol, Status, List as DTList } from './Styles';

type Certificate = {
  is_active: boolean
}

type HostedZone = {
  id: number
  domain_name: string
  name_servers?: string[]
  ns_ok?: boolean
  certificate?: Certificate
}

type Props = {
  hostedZone: HostedZone
}

const Domain = ({ hostedZone }: Props) => {
  return (
    <Link to={`/community/domains/${hostedZone.id}`}>
      <DTRow>
        <DTCol>
          <Header.H4>{hostedZone.domain_name}</Header.H4>
        </DTCol>
        <DTCol>
          <Status
            value={hostedZone.ns_ok ? 'active' : 'inactive'}
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
  hostedZones: HostedZone[]
}

const Domains = ({ hostedZones }: DomainsProps) =>
  <Container fluid style={{ width: '100%', padding: '0' }}>
    <Row>
      <Col xs={12} sm={8} md={9} lg={10}>
        <Header.H3>Domínios</Header.H3>
        <Text>Aqui você gerencia os Domínios (URLs customizadas) das páginas da sua comunidade.</Text>
      </Col>
      <Col xs={12} sm={4} md={3} lg={2}>
        <Button onClick={() => console.log('Adicionar domínio')}>Adicionar domínio</Button>
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
      {hostedZones.map((hostedZone: HostedZone, index: number) => (
        <Domain key={index} hostedZone={hostedZone} />
      ))}
    </DTList>
  </Container>
;

export default Domains;