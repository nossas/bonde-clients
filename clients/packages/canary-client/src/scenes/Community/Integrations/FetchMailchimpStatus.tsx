import { useQuery, gql, useSession } from 'bonde-core-tools';
import { MailchimpStatus } from './types';

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

const FetchMailchimpStatus = ({ children }: any) => {
  const { community } = useSession();
  const { data, loading, error, refetch } = useQuery(
    fetchGraphqlQuery,
    { variables: { is_community: true, id: community?.id } }
  );

  if (loading) return 'Carregando Mailchimp Status';
  else if (error) return `Failed ${error}`;

  return children({
    refetch,
    mailchimpStatus: (data as MailchimpStatus[])
  });
}

export default FetchMailchimpStatus;