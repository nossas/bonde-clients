import React from 'react';
import styled from 'styled-components';
import { Container, Row, Col } from 'react-grid-system';
import { Link } from 'react-router-dom';
import { Button, Header, Text, Icon } from 'bonde-components';
import ActiveIcon from './ActiveIcon';
import InactiveIcon from './InactiveIcon';

type HostedZone = {
  id: number
  domain_name: string
  name_servers?: string[]
  ns_ok?: boolean
}

type Props = {
  hostedZone: HostedZone
}

type DomainRowProps = {
  header?: boolean
}

const DomainCol = styled.div`
`

const DomainRow = styled.div<DomainRowProps>`
  display: grid;
  grid-template-columns: 500px auto 70px;
  grid-template-rows: ${props => !!props.header ? '30px' : '80px'};
  background-color: ${props => !!props.header ? 'none' : '#fff'};
  border-bottom: ${props => !!props.header ? 'none' : '1px solid #eee'};  

  ${DomainCol} {
    padding: ${props => !!props.header ? '0 20px' : '30px 20px'};
  }
`

const DomainList = styled.div`
  padding: 20px 0;

  a {
    text-decoration: none;
  }
`;

type ExtendTextProps = {
  active?: boolean
}

const ExtendText = styled(Text)`
  color: ${(props: ExtendTextProps) => props.active ? '#50E3C2' : '#444444'};

  svg {
    margin-right: 10px;
  }
`;

const Domain = ({ hostedZone }: Props) => {
  return (
    <Link to={`/community/domains/${hostedZone.id}`}>
      <DomainRow>
        <DomainCol>
          <Header.H4>{hostedZone.domain_name}</Header.H4>
        </DomainCol>
        <DomainCol>
          <ExtendText active={hostedZone.ns_ok}>
            {hostedZone.ns_ok ? (
              <>
                <ActiveIcon />
                <span>Ativo</span>
              </>
             ) : (
              <>
                <InactiveIcon />
                <span>Inativo</span>
              </>
             )}
          </ExtendText>
        </DomainCol>
        <DomainCol>
          <Icon name='ArrowRight' />
        </DomainCol>
      </DomainRow>
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
    <DomainList>
      <DomainRow header>
        <DomainCol>
          <Header.H5>Domínio</Header.H5>
        </DomainCol>
        <DomainCol>
          <Header.H5>Status</Header.H5>
        </DomainCol>
        <DomainCol />
      </DomainRow>
      {hostedZones.map((hostedZone: HostedZone, index: number) => (
        <Domain key={index} hostedZone={hostedZone} />
      ))}
    </DomainList>
  </Container>
;

export default Domains;