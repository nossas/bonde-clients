import React from 'react';
import { Header, Icon, Text } from 'bonde-components';
import {
  DNS as DTRow,
  Col as DTCol,
  List as DTList,
  Button,
  MainTitle
} from '../Styles';
import { DNSHostedZone, DNSRecord } from '../types';

type Props = {
  dnsHostedZone: DNSHostedZone
}

const Records = ({ dnsHostedZone }: Props) => {

  return (
    <DTList
      columnSize='400px 300px auto auto 200px'
      rowSize='auto'
    >
      <DTRow header>
        <DTCol>
          <MainTitle>Registro</MainTitle>
        </DTCol>
        <DTCol>
          <MainTitle>Valor</MainTitle>
        </DTCol>
        <DTCol>
          <MainTitle>Tipo</MainTitle>
        </DTCol>
        <DTCol>
          <MainTitle>TTL</MainTitle>
        </DTCol>
        <DTCol />
      </DTRow>
      {dnsHostedZone
        .dns_records
        .filter((r: DNSRecord) => r.record_type !== 'NS' && r.record_type !== 'SOA')
        .map((dnsRecord: DNSRecord) => (
          <DTRow key={dnsRecord.name}>
            <DTCol>
              <Header.H4>{dnsRecord.name}</Header.H4>
            </DTCol>
            <DTCol>
              <Text
                style={dnsRecord.record_type === 'TXT'
                  ? { wordBreak: 'break-all' }
                  : { whiteSpace: "break-spaces" }
                }
              >
                {dnsRecord.value}
              </Text>
            </DTCol>
            <DTCol>
              <Text>{dnsRecord.record_type}</Text>
            </DTCol>
            <DTCol>
              <Text>{dnsRecord.ttl}</Text>
            </DTCol>
            <DTCol>
              <Button
                onClick={() => {
                  console.log(`Remove ${dnsHostedZone.hosted_zone.Id || dnsHostedZone.hosted_zone.id}`)
                  alert(`Remove ${dnsHostedZone.hosted_zone.Id || dnsHostedZone.hosted_zone.id}`)
                }}
              >
                <Icon name='Trash' /> Excluir
              </Button>
            </DTCol>
          </DTRow>
        ))
      }
    </DTList>
  );
}

export default Records;