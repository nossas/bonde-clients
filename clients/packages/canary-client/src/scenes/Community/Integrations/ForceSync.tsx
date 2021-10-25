import React from 'react';
import { useQuery, useMutation, gql, useSession } from 'bonde-core-tools';
import { MailchimpStart } from './types';
import {
  Heading,
  Flex,
  Button,
  Text,
  Stack,
  Success,
  toast,  
} from 'bonde-components';

const fetchGraphqlQuery = gql`
query($id:Int!, $is_community:Boolean!) {
  resync_mailchimp_status(
    is_community: $is_community
    id: $id
  ) {
    active
    completed
    failed
    last_sync
    waiting
    status
  }
}
`
const fetchGraphqlMutation = gql`
mutation($id:Int!, $is_community:Boolean!) {
  resync_mailchimp_start(
    is_community: $is_community
    id: $id
  ) {
    status
  }
}
`
export default () => {
  const { community } = useSession();
  const { data, loading, error } = useQuery(
    fetchGraphqlQuery,
    {
      variables: { is_community: true, id: community?.id },
      pollInterval: 5000,
    },
  );
  const [setPropagating] = useMutation(
    fetchGraphqlMutation,
    { variables: { is_community: true, id: community?.id }, skip: true }
  );

  const done = async () => {
    const a: MailchimpStart = await setPropagating();
    if (typeof a !== 'undefined' && 
        typeof a.data.resync_mailchimp_start.status !== 'undefined' &&
        a.data.resync_mailchimp_start.status == 'started to add contacts to the queue') {
      toast(<Success message={`Ae! Sincronização em andamento.`} />, { type: toast.TYPE.SUCCESS });
    } else {
      toast(`Falha na atualização da base de contatos do mailchimp! ${a.data.resync_mailchimp_start.status}`, { type: toast.TYPE.ERROR });
    }
  };
  if (loading) return <Text>Carregando Mailchimp Status</Text>;
  else if (error) return <Text>Failed ${error}</Text>;

  return <Stack>
    <Heading as="h4" size="sm">Forçar sincronização</Heading>
    <Text>Sua base no Mailchimp não está atualizada? Tudo bem! Clique em sincronizar pra dar um empurrãozinho:</Text>
    <Heading as="h4" size="sm">Status</Heading>
    <Text size="sm">Data da última atualização: {(typeof data.resync_mailchimp_status.last_sync === 'undefined' ? '-' : data.resync_mailchimp_status.last_sync)}</Text>
    <Text size="sm">Total de sincronizações com sucesso: {data.resync_mailchimp_status.completed}</Text>
    <Text size="sm">Total de falhas na sincronização: {data.resync_mailchimp_status.failed}</Text>
    <Text size="sm">Total de sincronizações ativas: {data.resync_mailchimp_status.active}</Text>
    <Flex justifyContent="flex-end">
      <Button onClick={done} disabled={(data.resync_mailchimp_status.active > 0)} type='button' marginTop={4}>Sincronizar</Button>
    </Flex>
  </Stack>
}
