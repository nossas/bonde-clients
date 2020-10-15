import React from 'react';
import { Container, Row, Col } from 'react-grid-system';
import { useParams } from 'react-router-dom';
import { Header, Text, Icon } from 'bonde-components';
import copy from 'clipboard-copy';
import Tooltip from '../../../../components/Tooltip';
import { toast } from 'react-toastify';
import { Success } from '../../../../components/Notifications';
import { DNS as DTRow, Col as DTCol, Status, List as DTList, MainTitle, ActionTitle } from '../Styles';
import { CopyIcon } from '../Icons';
import Navigation from './Navigation';
import DomainStatus from './DomainStatus';

type Props = {
  hostedZones: any[]
}

const DetailDomain = ({ hostedZones }: Props) => {
  const { hostedZoneId } = useParams();
  const hostedZone = hostedZones.filter((hZ: any) => hZ.id === Number(hostedZoneId))[0];

  return (
    <Container fluid style={{ width: '100%', padding: '0' }}>
      <Navigation hostedZone={hostedZone} />
      <DomainStatus hostedZone={hostedZone} />
      <Row>
        {hostedZone.ns_ok && (
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
              {hostedZone.dns_records.map((dnsRecord: any) => (
                <DTRow key={dnsRecord.name}>
                  <DTCol>
                    <Header.H4>{dnsRecord.name}</Header.H4>
                  </DTCol>
                  <DTCol>
                    <Status
                      value={hostedZone.ns_ok ? 'active' : 'inactive'}
                      labels={{ 'active': 'Ativo', 'inactive': 'Inativo' }}
                    />
                  </DTCol>
                  <DTCol>
                    <ActionTitle><Icon name='Trash' /> Excluir</ActionTitle>
                  </DTCol>
                </DTRow>
              ))}
            </DTList>
          </Col>
        )}
        <Col xs={12}>
          <MainTitle>
            {`Registros de nome (Name servers)`}
            <Tooltip info='Os registros de nome ("name servers" na gringa) são usados para conectar seu domínio ao BONDE.' />
          </MainTitle>
          <DTList columnSize='auto 200px' rowSize='60px' padding='20px 20px'>
            {hostedZone.name_servers.map((ns: string) => (
              <DTRow key={ns}>
                <DTCol>
                  <Text>{ns}</Text>
                </DTCol>
                <DTCol>
                  <ActionTitle
                    onClick={() => {
                      copy(ns)
                      toast(<Success message='Name Server copiado com sucesso!' />, { type: toast.TYPE.SUCCESS });
                    }}
                  >
                    <CopyIcon /> Copiar
                  </ActionTitle>
                </DTCol>
              </DTRow>
            ))}
          </DTList>
        </Col>
      </Row>
    </Container>
  )
}

export default DetailDomain;