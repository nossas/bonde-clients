import { useQuery, gql, useSession } from 'bonde-core-tools';
import { MailchimpLastSync, MailchimpStatus } from './types';

const fetchGraphqlQuery = gql`
query($id:Int!, $is_community:Boolean!) {
  resyncMailchimpStatus(
    is_community: $is_community
    id: $id
  ) {
    active
    completed
    failed
    waiting
  }
}
`

const fetchGraphqlQuery2 = gql`
query($id:Int!, $is_community:Boolean!) {
  resyncMailchimpLastCompleted(
    is_community: $is_community
    id: $id
  ) {
    date
  }
}
`

const FetchMailchimpStatus = ({ children }: any) => {
  const { community } = useSession();
  const { data, loading, error, refetch } = useQuery(
    fetchGraphqlQuery,
    { variables: { is_community: true, id: community?.id } }
  );

  const { data2, loading2, error2 } = useQuery(
    fetchGraphqlQuery2,
    { variables: { is_community: true, id: community?.id } }
  );

  if (loading) return 'Carregando Mailchimp Status';
  else if (error) return `Failed ${error}`;

  if (loading2) return 'Carregando Mailchimp Last Sync';
  else if (error2) return `Failed ${error2}`;

  return children({
    refetch,
    mailchimpStatus: (data as MailchimpStatus[]),
    mailchimpLastSync: (data2 as MailchimpLastSync[])
  });
}

export default FetchMailchimpStatus;