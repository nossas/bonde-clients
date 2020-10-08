import React from 'react';
import styled from 'styled-components';
import { Container, Row, Col } from 'react-grid-system';
import { Link } from 'react-router-dom';
import { Button, Header, Text, Icon } from 'bonde-components';

type HostedZone = {
  id: number
  domain_name: string
  name_servers?: string[]
  ns_ok?: boolean
}

type Props = {
  hostedZone: HostedZone
}

const DomainStyled = styled.div`
  padding: 10px 20px;
  margin-bottom: 10px;
  background-color: #fff;
`

const HeaderStyled = styled.div`
  display: flex;
  justify-content: space-between;
  cursor: pointer;
`

const ListStyled = styled.ul`
  padding: 0;
  margin: 0;
  list-style: none;
`

const Domain = ({ hostedZone }: Props) => {
  return (
    <Link to={`/community/domains/${hostedZone.id}`}>
      <DomainStyled>
        <HeaderStyled>
          <span>{hostedZone.domain_name}</span>
          <span>{hostedZone.ns_ok ? 'Ativo' : 'Inativo'}</span>
          <Icon name='ArrowRight' />
        </HeaderStyled>
      </DomainStyled>
    </Link>
  );
}

const Domains = ({ hostedZones }: any) =>
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
    <ListStyled>
      {hostedZones.map((hostedZone: HostedZone, index: number) => (
        <li key={index}><Domain hostedZone={hostedZone} /></li>
      ))}
    </ListStyled>
  </Container>
;

export default Domains;