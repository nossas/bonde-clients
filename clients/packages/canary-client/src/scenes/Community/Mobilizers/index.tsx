import React, { useState } from 'react';
import { Loading, Heading, Box, Stack, Button } from 'bonde-components';
import { useQuery, useSession, gql } from 'bonde-core-tools';
import { useTranslation } from 'react-i18next';
import UsersTable from './UsersTable';
import InvitationsTable from './InvitationsTable';
import InviteForm from './InviteForm';

const InvitationsQuery = gql`
  query InvitationsByCommunity($communityId: Int!) {
    invitations_aggregate(
      where: { community_id: { _eq: $communityId }, expired: { _neq: true } },
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

const FetchInvitations = () => {
  const [menu, setMenu] = useState(1);
  const { t } = useTranslation('community');
  // Session
  const { user, community } = useSession();
  // Query
  const variables = { communityId: community?.id };
  const { data, loading, error, refetch } = useQuery(InvitationsQuery, { variables });

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

  const customTheme = (index: number) => ({
    variant: "link",
    colorScheme: "gray",
    isActive: menu === index,
    onClick: () => setMenu(index),
    _active: {
      color: "pink.200"
    }
  })

  return (
    <Stack spacing={4}>
      <Box bg="white" boxShadow="sm" p={6}>
        <Heading as="h3" size="lg" mb={4}>{t('mobilizers.form.title')}</Heading>
        <InviteForm onSuccess={onRefetch} isCommunityAdmin={isCommunityAdmin} />
      </Box>
      <Stack direction="row" spacing={4}>
        <Button {...customTheme(1)}>
          {t('mobilizers.filters.invitations', { count: invitationsCount })}
        </Button>
        <Button {...customTheme(2)}>
          {t('mobilizers.filters.mobilizers', { count: communityUsersCount })}
        </Button>
      </Stack>
      {menu === 1 && <InvitationsTable data={invitations} {...tableProps} />}
      {menu === 2 && <UsersTable data={communityUsers} {...tableProps} />}
    </Stack>
  );
};

export default FetchInvitations;