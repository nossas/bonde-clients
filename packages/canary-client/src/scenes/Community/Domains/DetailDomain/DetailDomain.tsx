import React from 'react';
import { Row, Col } from 'react-grid-system';
import { toast } from 'react-toastify';
import { useHistory } from 'react-router-dom';
import { Header, Icon, Text, Success } from 'bonde-components';
import { useMutation, gql } from 'bonde-core-tools';
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
  Status,
  List as DTList,
  MainTitle,
  Button,
  SmallText
} from '../Styles';

const deleteDomainGQL = gql`
  mutation ($input: DeleteDomainInput) {
    delete_domain(input: $input)
  }
`;

const DetailDomain = ({ dnsHostedZone, refetch }: any) => {
  const [deleteDomain] = useMutation(deleteDomainGQL);
  const { push } = useHistory();

  const onDelete = async () => {
    try {
      const input = {
        dns_hosted_zone_id: dnsHostedZone.id,
        community_id: dnsHostedZone.community.id
      };
      await deleteDomain({ variables: { input } });
      toast(<Success message='Dominio removido com sucesso.' />, { type: toast.TYPE.SUCCESS });

      refetch();

      push('/community/domains');
    } catch (err) {
      console.log('err', err);
      toast('Houve um problema ao tentar remover domínio', { type: toast.TYPE.ERROR });
    }
  }

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
            <DTCol>
              <MainTitle>Ações</MainTitle>
            </DTCol>
          </DTRow>
          <DTRow>
            <DTCol>
              <Text bold>{dnsHostedZone.domain_name}</Text>
            </DTCol>
            <DTCol>
              <Status
                value={dnsHostedZone.ns_ok ? 'active' : 'inactive'}
                labels={{ 'active': 'Ativo', 'inactive': 'Inativo' }}
              />
            </DTCol>
            <DTCol>
              <Button onClick={onDelete} style={{ fontSize: '13px' }}>
                <Icon size='small' name='Trash' /> Excluir
              </Button>
            </DTCol>
          </DTRow>
        </DTList>
      </Col>
      <Col xs={12}>
        <MainTitle>{!dnsHostedZone.ns_ok ? 'Entenda o processo' : 'Detalhes'}</MainTitle>
        <DTList columnSize='auto 50px auto 50px auto 50px auto 50px auto' rowSize='auto'>
          <DTRow style={{ alignItems: 'center', padding: '10px' }}>
            <DTCol align='center'>
              <InsertDomainIcon />
              <Header.H5>Inserir domínio</Header.H5>
              <SmallText>O primeiro passo é comprar o domínio em um site como GoDaddy ou RegistroBR e inserir aqui no BONDE.</SmallText>
              <Status
                activeStatus='done'
                value='done'
                labels={{ 'done': 'Concluído' }}
              />
            </DTCol>
            <DTCol>
              <Icon name='ArrowRight' size='small' />
            </DTCol>
            <DTCol align='center'>
              <ConnectDomainIcon />
              <Header.H5>Conectar ao BONDE</Header.H5>
              <SmallText>Copie os registros abaixo e cole no site onde comprou seu domínio. Clique aqui para ver o passo a passo.</SmallText>
              <Status
                activeStatus='done'
                value='done'
                labels={{ 'done': 'Concluído' }}
              />
            </DTCol>
            <DTCol>
              <Icon name='ArrowRight' size='small' />
            </DTCol>
            <DTCol align='center'>
              <PropagateDomainIcon />
              <Header.H5>Propagar Domínio</Header.H5>
              <SmallText>O provedor onde você comprou seu domínio faz a propagação. Esse processo pode levar até 48h.</SmallText>
              <Status
                value={dnsHostedZone.ns_ok ? 'active' : 'inactive'}
                labels={{ 'active': 'Concluído', 'inactive': 'Inativo' }}
              />
            </DTCol>
            <DTCol>
              <Icon name='ArrowRight' size='small' />
            </DTCol>
            <DTCol align='center'>
              <CertificateDomainIcon />
              <Header.H5>Certificar Domínio</Header.H5>
              <SmallText>Quando o provedor concluir a propagação, o BONDE faz a certificação. Esse processo pode levar até 24 horas.</SmallText>
              <Status
                value={dnsHostedZone.certificate?.is_active ? 'active' : 'inactive'}
                labels={{ 'active': 'Completo', 'inactive': 'Inativo' }}
              />
            </DTCol>
            <DTCol>
              <Icon name='ArrowRight' size='small' />
            </DTCol>
            <DTCol align='center'>
              <ActiveDomainIcon />
              <Header.H5>Domínio Ativo</Header.H5>
              <SmallText>Pronto! Seu domínio está  ativo e disponível para utilizar nas páginas da sua comunidade no BONDE.</SmallText>
              <Status
                activeStatus='done'
                value='done'
                labels={{ 'done': 'Concluído' }}
              />
            </DTCol>
          </DTRow>
        </DTList>
      </Col>
    </Row>
  );
}

export default DetailDomain;