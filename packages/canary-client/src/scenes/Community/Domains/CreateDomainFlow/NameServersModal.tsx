import React, { useState } from 'react';
import styled from 'styled-components';
import { Modal, Header, Text, Button, Link } from 'bonde-components';
import { Container, Row, Col } from 'react-grid-system';
import { toast } from 'react-toastify';
import { Success } from '../../../../components/Notifications';
import NameServers from '../NameServers';

const Radio = styled.label`
  display: flex;
  cursor: pointer;

  input {
    margin: 5px 10px 0 0;

    &:checked,
    &:not(:checked) {
      position: absolute;
      left: -9999px;
    }
    &:checked + p,
    &:not(:checked) + p
    {
      position: relative;
      padding-left: 28px;
      color: #666;
    }
    &:checked + p:before,
    &:not(:checked) + p:before {
      content: '';
      position: absolute;
      left: 0;
      top: 0;
      width: 18px;
      height: 18px;
      border: 1px solid #ddd;
      border-radius: 100%;
      background: #fff;
    }
    &:checked + p:after,
    &:not(:checked) + p:after {
      content: '';
      width: 12px;
      height: 12px;
      background: #F87DA9;
      position: absolute;
      top: 3px;
      left: 3px;
      border-radius: 100%;
      -webkit-transition: all 0.2s ease;
      transition: all 0.2s ease;
    }
    &:not(:checked) + p:after {
      opacity: 0;
      -webkit-transform: scale(0);
      transform: scale(0);
    }
    &:checked + p:after {
      opacity: 1;
      -webkit-transform: scale(1);
      transform: scale(1);
    }
  }
`

const TopicList = styled.ol`
`

type DNSHostedZone = {
  name_servers: string[]
}

type Props = {
  open: boolean
  onClose: any
  dnsHostedZone: DNSHostedZone
}

const NameServersModal = ({ open, onClose, dnsHostedZone }: Props) => {
  const [status, setStatus] = useState();

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
              onClick={() => {
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