import React from 'react';
// import styled from 'styled-components';
import {
  Modal,
  Header,
  Text,
  Button,
  Link,
  ConnectedForm,
  InputField,
  toast,
  Success
} from 'bonde-components';
import { useMutation, gql } from 'bonde-core-tools';
import { Container, Row, Col } from 'react-grid-system';
import SelectField from '../../../../components/SelectField';
import { DNSHostedZone } from '../types';

const createRecordGQL = gql`
  mutation ($input: RecordInput) {
    create_record(input: $input)
  }
`;

type Props = {
  open: boolean
  onClose: any
  refetch: any
  dnsHostedZone: DNSHostedZone
}

const RecordModal = ({ dnsHostedZone, open, onClose, refetch }: Props) => {
  const [createRecord] = useMutation(createRecordGQL);

  return (
    <Modal width='50%' isOpen={open} onClose={onClose}>
      <ConnectedForm
        initialValues={{
          community_id: dnsHostedZone.community.id,
          dns_hosted_zone_id: dnsHostedZone.id,
          hosted_zone_id: dnsHostedZone.hosted_zone.Id || dnsHostedZone.hosted_zone.id
        }}
        onSubmit={async ({ ttl, value, record_type, ...values }: any) => {
          try {
            const variables = {
              input: {
                ...values,
                record_type,
                value: record_type !== 'MX' ? value : value.split(/\. /).map((v: string) => `${v.replace(/\.$/, '')}.`),
                ttl: Number(ttl)
              }
            }
            console.log('variables', { variables });
            await createRecord({ variables });
            toast(<Success message='Registro adicionado com success' />, { type: toast.TYPE.SUCCESS });
            onClose();
            refetch();
          } catch (err) {
            toast(err, { type: toast.TYPE.ERROR });
          }
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
            <Col xs={2}>
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
            <Col xs={4}>
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
