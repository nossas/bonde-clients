import React from 'react';
// import styled from 'styled-components';
import { Modal, Header, Text, Button, Link, ConnectedForm, InputField } from 'bonde-components';
import { Container, Row, Col } from 'react-grid-system';
import SelectField from '../../../../components/SelectField';

type Props = {
  open: boolean
  onClose: any
  dnsHostedZone: any
}

const RecordModal = ({ dnsHostedZone, open, onClose }: Props) => {
  return (
    <Modal width='40%' isOpen={open} onClose={onClose}>
      <ConnectedForm
        initialValues={{ role: 2 }}
        onSubmit={async (values: any) => {
          console.log('values', { values });
        }}
      >
        {({ submitting }) => (
        <Container fluid style={{ width: '100%', padding: '0' }}>
          <Row style={{ marginBottom: '24px' }}>
            <Col xs={12}>
              <Header.H2>Adicionar registro</Header.H2>
            </Col>
          </Row>
          <Row style={{ marginBottom: '20px' }}>
            <Col xs={12}>
              <Text>Pra começar, você precisa comprar um domínio em um site como GoDaddy ou RegistroBR. Se isso tudo é novo pra você, clique aqui pra saber mais.</Text>
            </Col>
          </Row>
          <Row style={{ marginBottom: '20px' }}>
            <Col xs={4}>
              <InputField
                name='name'
                type='text'
                label='Nome'
                placeholder={`.${dnsHostedZone.domain_name}`}
              />
            </Col>
            <Col xs={3}>
              <SelectField
                name='record_type'
                label='Tipo'
              >
                <option value='A'>A</option>
                <option value='CNAME'>CNAME</option>
                <option value='MX'>MX</option>
                <option value='TXT'>TXT</option>
                <option value='AAA'>AAA</option>
              </SelectField>
            </Col>
            <Col xs={3}>
              <InputField
                name='value'
                type='text'
                label='Valor'
              />
            </Col>
            <Col xs={2}>
              <InputField
                name='ttl'
                type='number'
                label='TTL'
              />
            </Col>
          </Row>
          <Row>
            <Col xs={6}>
              <Link onClick={onClose}>Cancelar</Link>
            </Col>
            <Col xs={6} style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <Button type='submit' disabled={submitting}>Continuar</Button>
            </Col>
          </Row>
        </Container>
        )}
      </ ConnectedForm>
    </Modal>
  );
}

export default RecordModal;
