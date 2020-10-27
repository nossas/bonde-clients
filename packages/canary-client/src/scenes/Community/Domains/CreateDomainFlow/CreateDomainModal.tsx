import React, { useState } from 'react';
import styled from 'styled-components';
import { Modal, Header, Text, Button, Link } from 'bonde-components';
import { Container, Row, Col } from 'react-grid-system';

const InputDomain = styled.div`
  display: flex;
  background-color: #eee;
  padding: 14px 16px;
  align-items: center;
  margin-top: 20px;

  input {
    background-color: #fff;
    border-radius: 5px;
    padding: 9px 15px;
    margin-left: 10px;
    flex-grow: 1;
  }
`;

type Props = {
  open: boolean
  onClose: any
  onSubmit: any
}

const CreateDomainModal = ({ open, onSubmit, onClose }: Props) => {
  const [value, onChange] = useState('');
  
  return (
    <Modal width='30%' isOpen={open} onClose={onClose}>
      <Container fluid style={{ width: '100%', padding: '0' }}>
        <Row style={{ marginBottom: '24px' }}>
          <Col xs={12}>
            <Header.H2>Adicionar domínio</Header.H2>
          </Col>
        </Row>
        <Row style={{ marginBottom: '20px' }}>
          <Col xs={12}>
            <Text>Pra começar, você precisa comprar um domínio em um site como GoDaddy ou RegistroBR. Se isso tudo é novo pra você, clique aqui pra saber mais.</Text>
          </Col>
        </Row>
        <Row style={{ marginBottom: '20px' }}>
          <Col xs={12}>
            <Text><b>Já tem um domínio?</b> Então adicione ele aqui:</Text>
            <InputDomain>
              <Text>{`http://www.`}</Text>
              <input type='text' value={value} onChange={(e: any) => onChange(e.target.value)} />
            </InputDomain>
          </Col>
        </Row>
        <Row>
          <Col xs={6}>
            <Link onClick={onClose}>Cancelar</Link>
          </Col>
          <Col xs={6}>
            <Button onClick={() => onSubmit({ value })} type='button'>Continuar</Button>
          </Col>
        </Row>
      </Container>
    </Modal>
  );
}

export default CreateDomainModal;