import React, { useState } from 'react';
import { useMutation, gql } from 'bonde-core-tools';
import { Link, Button, toast, Success, Flex } from 'bonde-components';
import { DNSHostedZone } from '../types';
import NameServersForm from './NameServersForm';
import IPConnectForm from './IPConnectForm';

const propagatingDNSGQL = gql`
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

type Props = {
  onClose: any;
  dnsHostedZone: DNSHostedZone
}

const ConnectDNS = ({ dnsHostedZone, onClose }: Props) => {
  const [status, setStatus] = useState();
  const [isNameServers, setIsNameServers] = useState(true);
  const [setPropagating] = useMutation(propagatingDNSGQL);

  const changeStatus = (e: any) => setStatus(e.target.value);
  const connectByIP = () => setIsNameServers(false);

  const done = async () => {
    await setPropagating({ variables: { dns_hosted_zone_id: dnsHostedZone.id } });
    toast(<Success message='Dominio salvo com sucesso!' />, { type: toast.TYPE.SUCCESS });
    onClose()
  }

  return (
    <>
      {isNameServers
        ? <NameServersForm status={status} changeStatus={changeStatus} connectByIP={connectByIP} dnsHostedZone={dnsHostedZone} />
        : <IPConnectForm status={status} changeStatus={changeStatus} />
      }
      <Flex direction="row" justify="space-between" align="center" pt={6}>
        <Link onClick={onClose}>Voltar</Link>
        <Button onClick={done} disabled={status !== 'registered'} type='button'>Pronto!</Button>
      </Flex>
    </>
  )
}

export default ConnectDNS;