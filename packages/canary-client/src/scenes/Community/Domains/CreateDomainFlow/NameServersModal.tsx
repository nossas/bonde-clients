import React, { useState } from 'react';
import styled from 'styled-components';
import { Modal, Header, Text, Button, Link, toast, Success } from 'bonde-components';
import { useMutation, gql } from 'bonde-core-tools';
import { Container, Row, Col } from 'react-grid-system';
import NameServers from '../NameServers';
import Radio from './Radio';

const TopicList = styled.ol``;

type DNSHostedZone = {
  id: number
  name_servers: string[]
}

type Props = {
  open: boolean
  onClose: any
  dnsHostedZone: DNSHostedZone
}

const PropagatingDNSGQL = gql`
  mutation ($dns_hosted_zone_id: Int!) {
    update_dns_hosted_zones_by_pk(
      pk_columns: { id: $dns_hosted_zone_id },
      _set: { status: "propagating" }
    ) {
      id
      domain_name
      community_id
      status
    }
  }
`;

const NameServersModal = ({ open, onClose, dnsHostedZone }: Props) => {
  const [status, setStatus] = useState();
  const [setPropagating] = useMutation(PropagatingDNSGQL);

  return (
    <Modal width='60%' isOpen={open} onClose={onClose}>
      <Container fluid style={{ width: '100%', padding: '0' }}>
        <Row style={{ marginBottom: '24px' }}>
          <Col xs={6}>
            <Header.H2>Agora, precisamos da sua ajuda para conectá-lo ao BONDE</Header.H2>
          </Col>
        </Row>
        <Row style={{ marginBottom: '20px' }}>
          <Col xs={6}>
            <Header.H4>Passo a passo</Header.H4>
            <TopicList>
              <li>
                <Text>{`Abra o site onde comprou o domínio, (GoDaddy.com, por exemplo), e entre nas configurações do domínio.`}</Text>
              </li>
              <li>
                <Text>{`Procure a opção "Manage DNS" e clique nela.`}</Text>
              </li>
              <li>
                <Text>{`Em "nameservers", selecione "custom".`}</Text>
              </li>
              <li>
                <Text>{`Copie os 4 códigos abaixo e cole nos campos que apareceram, um em cada campo. (Se necessário, pode adicionar mais campos até colar todos os quatro.)`}</Text>
              </li>
              <li>
                <Text>Clique em salvar.</Text>
              </li>
            </TopicList>
          </Col>
          <Col xs={6}>
            <NameServers dnsHostedZone={dnsHostedZone} />
            <Radio>
              <input
                type='radio'
                value='registered'
                checked={status === 'registered'}
                onChange={(e: any) => setStatus(e.target.value)}
              />
              <Text>Os registros de nome foram atualizados.</Text>
            </Radio>
          </Col>
        </Row>
        <Row>
          <Col xs={6}>
            <Link onClick={onClose}>Voltar</Link>
          </Col>
          <Col xs={6}>
            <Button
              onClick={async () => {
                const { data, errors } = await setPropagating({ variables: { dns_hosted_zone_id: dnsHostedZone.id }});
                console.log('data, errors', { data, errors });
                toast(<Success message='Dominio salvo com sucesso!' />, { type: toast.TYPE.SUCCESS });
                onClose()
              }}
              disabled={status !== 'registered'}
              type='button'
            >
              Pronto!
            </Button>
          </Col>
        </Row>
      </Container>
    </Modal>
  )
}

export default NameServersModal;