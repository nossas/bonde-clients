import React from 'react';
import { Container, Row, Col } from 'react-grid-system';
import { useParams } from 'react-router-dom';
// import { Header, Icon } from 'bonde-components';
// import { DNS as DTRow, Col as DTCol, Status, List as DTList, MainTitle, Button } from '../Styles';
import Navigation from './Navigation';
import DetailDomain from './DetailDomain';
import NameServers from '../NameServers';

type Props = {
  refetch: any
  dnsHostedZones: any[]
}

const Content = ({ dnsHostedZones, refetch }: Props) => {
  const { hostedZoneId } = useParams();
  const dnsHostedZone = dnsHostedZones.filter((hZ: any) => hZ.id === Number(hostedZoneId))[0];

  return (
    <Container fluid style={{ width: '100%', padding: '0' }}>
      <Navigation hostedZone={dnsHostedZone} />
      <DetailDomain dnsHostedZone={dnsHostedZone} refetch={refetch} />
      <Row>
        {/* {dnsHostedZone.ns_ok && (
          <Col xs={12}>
            <DTList columnSize='500px auto 200px'>
              <DTRow header>
                <DTCol>
                  <MainTitle>Subdomínios</MainTitle>
                </DTCol>
                <DTCol>
                  <MainTitle>Status</MainTitle>
                </DTCol>
                <DTCol />
              </DTRow>
              {dnsHostedZone.dns_records.map((dnsRecord: any) => (
                <DTRow key={dnsRecord.name}>
                  <DTCol>
                    <Header.H4>{dnsRecord.name}</Header.H4>
                  </DTCol>
                  <DTCol>
                    <Status
                      value={dnsHostedZone.ns_ok ? 'active' : 'inactive'}
                      labels={{ 'active': 'Ativo', 'inactive': 'Inativo' }}
                    />
                  </DTCol>
                  <DTCol>
                    <Button
                      onClick={() => {
                        console.log(`Remove ${dnsHostedZone.hostedZone.Id || dnsHostedZone.hostedZone.id}`)
                        alert(`Remove ${dnsHostedZone.hostedZone.Id || dnsHostedZone.hostedZone.id}`)
                      }}
                    >
                      <Icon name='Trash' /> Excluir
                    </Button>
                  </DTCol>
                </DTRow>
              ))}
            </DTList>
          </Col>
        )} */}
        <Col xs={12}>
          <NameServers dnsHostedZone={dnsHostedZone} />
        </Col>
      </Row>
    </Container>
  )
}

export default Content;