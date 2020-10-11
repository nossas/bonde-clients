import React from 'react';
import { Row, Col } from 'react-grid-system';
import { Header, Icon } from 'bonde-components';
import {
  ActiveDomainIcon,
  CertificateDomainIcon,
  ConnectDomainIcon,
  InsertDomainIcon,
  PropagateDomainIcon
} from '../Icons';
import {
  DNS as DTRow,
  Col as DTCol,
  StatusView,
  List as DTList,
  MainTitle,
  ActionTitle,
  SmallText
} from '../Styles';

const DomainStatus = ({ hostedZone }: any) => {
  return (
    <Row>
      <Col xs={12}>
        <DTList columnSize='500px auto 200px'>
          <DTRow header>
            <DTCol>
              <MainTitle>Domínio</MainTitle>
            </DTCol>
            <DTCol>
              <MainTitle>Status</MainTitle>
            </DTCol>
            <DTCol />
          </DTRow>
          <DTRow>
            <DTCol>
              <Header.H4>{hostedZone.domain_name}</Header.H4>
            </DTCol>
            <DTCol>
              <StatusView active={hostedZone.ns_ok} />
            </DTCol>
            <DTCol>
              <ActionTitle><Icon name='Trash' /> Excluir</ActionTitle>
            </DTCol>
          </DTRow>
        </DTList>
      </Col>
      <Col xs={12}>
        <MainTitle>{!hostedZone.ns_ok ? 'Entenda o processo' : 'Detalhes'}</MainTitle>
        <DTList columnSize='auto 50px auto 50px auto 50px auto 50px auto' rowSize='auto'>
          <DTRow style={{ alignItems: 'center', padding: '10px' }}>
            <DTCol align='center'>
              <InsertDomainIcon />
              <Header.H5>Inserir domínio</Header.H5>
              <SmallText>O primeiro passo é comprar o domínio em um site como GoDaddy ou RegistroBR e inserir aqui no BONDE.</SmallText>
            </DTCol>
            <DTCol>
              <Icon name='ArrowRight' size='small' />
            </DTCol>
            <DTCol align='center'>
              <ConnectDomainIcon />
              <Header.H5>Conectar ao BONDE</Header.H5>
              <SmallText>Copie os registros abaixo e cole no site onde comprou seu domínio. Clique aqui para ver o passo a passo.</SmallText>
            </DTCol>
            <DTCol>
              <Icon name='ArrowRight' size='small' />
            </DTCol>
            <DTCol align='center'>
              <PropagateDomainIcon />
              <Header.H5>Propagar Domínio</Header.H5>
              <SmallText>O provedor onde você comprou seu domínio faz a propagação. Esse processo pode levar até 48h.</SmallText>
            </DTCol>
            <DTCol>
              <Icon name='ArrowRight' size='small' />
            </DTCol>
            <DTCol align='center'>
              <CertificateDomainIcon />
              <Header.H5>Certificar Domínio</Header.H5>
              <SmallText>Quando o provedor concluir a propagação, o BONDE faz a certificação. Esse processo pode levar até 24 horas.</SmallText>
            </DTCol>
            <DTCol>
              <Icon name='ArrowRight' size='small' />
            </DTCol>
            <DTCol align='center'>
              <ActiveDomainIcon />
              <Header.H5>Domínio Ativo</Header.H5>
              <SmallText>Pronto! Seu domínio está  ativo e disponível para utilizar nas páginas da sua comunidade no BONDE.</SmallText>
            </DTCol>
          </DTRow>
        </DTList>
      </Col>
    </Row>
  );
}

export default DomainStatus;