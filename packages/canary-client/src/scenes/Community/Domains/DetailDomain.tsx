import React from 'react';
import { Container, Row, Col } from 'react-grid-system';
import { useParams, Link } from 'react-router-dom';
import { Button, Header, Text } from 'bonde-components';
import Tooltip from '../../../components/Tooltip';
import Panel from '../Panel';

const DetailDomain = ({ hostedZones }: any) => {
  const { hostedZoneId } = useParams();
  const hostedZone = hostedZones.filter((hZ: any) => hZ.id === Number(hostedZoneId))[0];

  return (
    <Container fluid style={{ width: '100%', padding: '0' }}>
      <Row>
        <Col xs={12} sm={8} md={9} lg={10}>
          <Link to='/community/domains'>
            <Header.H5>Detalhes do domínio</Header.H5>
          </Link>
        </Col>
        <Col xs={12} sm={4} md={3} lg={2}>
          <Button onClick={() => console.log('Adicionar domínio')}>Adicionar subdomínio</Button>
        </Col>
      </Row>
      <Row>
        <Col xs={12}>
          <Header.H6>Domínio</Header.H6>
          <Text>{hostedZone.domain_name}</Text>
        </Col>
        <Col xs={12}>
          <Header.H6>Subdomínios</Header.H6>
        </Col>
        <Col xs={12}>
          <Header.H6>
            {`Registros de nome (Name servers)`}
            <Tooltip info='Os registros de nome ("name servers" na gringa) são usados para conectar seu domínio ao BONDE.' />
          </Header.H6>
          <Panel>
            {hostedZone.name_servers.map((ns: string) => (
              <Text key={ns}>{ns}</Text>
            ))}
          </Panel>
        </Col>
      </Row>
    </Container>
  )
}

export default DetailDomain;