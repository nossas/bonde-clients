import React, { useState } from 'react';
import { useMutation, gql, useSession } from 'bonde-core-tools';
import { Button } from 'bonde-components';
import CreateDomainModal from './CreateDomainModal';
import NameServersModal from './NameServersModal';

const createDomainGQL = gql`
  mutation ($input: DomainInput) {
    create_domain(input: $input) {
      comment
      community_id
      created_at
      domain_name
      id
      name_servers
      ns_ok
      updated_at
    }
  }
`;

type DNSHostedZone = {
  id: number
  domain_name: string
  name_servers: string[]
  ns_ok: boolean
  comment?: string
  community_id: number
  created_at?: string
  updated_at?: string
}

const CreateDomainFlow = ({ btnText, refetch }: any) => {
  const [open, setOpen] = useState(false);
  const [dnsHostedZone, setDnsHostedZone] = useState<DNSHostedZone>();
  const [mutation] = useMutation(createDomainGQL);
  const { community, user } = useSession();

  const onSubmit = async ({ value }: any) => {
    const { data } = await mutation({
      variables: {
        input: {
          domain: value,
          community_id: community?.id,
          comment: `Created by ${user.firstName}`
        }
      }
    });
    setDnsHostedZone(data.create_domain);
  }

  const onClose = () => {
    setOpen(false)
    setDnsHostedZone(undefined)
  }

  return (
    <>
      <Button onClick={() => setOpen(true)}>{btnText}</Button>
      {!dnsHostedZone
        ? <CreateDomainModal open={open} onClose={onClose} onSubmit={onSubmit} />
        : <NameServersModal
            open={open}
            onClose={() => {
              onClose()
              refetch()
            }}
            dnsHostedZone={dnsHostedZone}
          />
      }
    </>
  );
}

export default CreateDomainFlow;