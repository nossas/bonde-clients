import React, { useState } from 'react';
import styled from 'styled-components';
import { Loading, Header } from 'bonde-components';
import { useQuery, useSession, gql } from 'bonde-core-tools';
import UsersTable from './UsersTable';
import InvitationsTable from './InvitationsTable';
import InviteForm from './InviteForm';

const InvitationsQuery = gql`
  query InvitationsByCommunity($communityId: Int!) {
    invitations_aggregate(
      where: { community_id: { _eq: $communityId }, expired: { _is_null: true } },
      order_by: { created_at: desc_nulls_last }
    ) {
      nodes {
        id
        user {
          first_name
          email
        }
        created_at
        role
        email
        expired
        expires
      }
      aggregate {
        count
      }
    }

    community_users_aggregate(where: { community_id: { _eq: $communityId } }) {
      nodes {
        id
        user {
          id
          avatar
          first_name
          last_name
          email
        }
        role
        community_id
      }
      aggregate {
        count
      }
    }
  }
`;

const Flex = styled.div`
  display: flex;
  flex-direction: row;

  ${Header.h5} {
    margin: 0 20px 15px 0;
    padding: 0 0 1px 0;
    cursor: pointer;
    font-weight: bold;
    text-transform: uppercase;
  }

  ${Header.h5}.active {
    color: #ee0099;
  }
`;

type Props = {
  community: any
}

const FetchInvitations = ({ community }: Props) => {
  const variables = { communityId: community.id };
  const { data, loading, error, refetch } = useQuery(InvitationsQuery, { variables });
  const [menu, setMenu] = useState(1);
  const { user } = useSession();

  if (loading) return <Loading />;
  if (error) return <div>Error</div>;

  const {
    invitations_aggregate: {
      nodes: invitations,
      aggregate: {
        count: invitationsCount
      }
    },
    community_users_aggregate: {
      nodes: communityUsers,
      aggregate: {
        count: communityUsersCount
      }
    }
  } = data;

  const onRefetch = () => refetch(variables);

  // Check if permissions on frontend
  let isCommunityAdmin = user.isAdmin;
  if (!isCommunityAdmin) {
    isCommunityAdmin = communityUsers.filter((c: any) => c.user.id === user.id)[0].role === 1;
  }

  const tableProps = {
    refetch: onRefetch,
    isCommunityAdmin
  };

  return (
    <>
      <Header.h3>Convidar um mobilizador(a)</Header.h3>
      <InviteForm onSuccess={onRefetch} isCommunityAdmin={isCommunityAdmin} />
      <Flex>
        <Header.h5 className={menu === 1 ? 'active' : ''} onClick={() => setMenu(1)}>
          {`Convites (${invitationsCount})`}
        </Header.h5>
        <Header.h5 className={menu === 2 ? 'active' : ''} onClick={() => setMenu(2)}>
          {`Mobilizadores (${communityUsersCount})`}
        </Header.h5>
      </Flex>
      {menu === 1 && <InvitationsTable data={invitations} {...tableProps} />}
      {menu === 2 && <UsersTable data={communityUsers} {...tableProps} />}
    </>
  );
};

export default FetchInvitations;