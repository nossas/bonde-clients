import React from "react";
import styled from "styled-components";
import { useSession, useQuery, gql } from "bonde-core-tools";
import { Empty } from "bonde-components";
import { useFilterState } from "../../services/FilterProvider";
import { getSelectValues, fuseTicketsWithUsers } from "../../services/utils";

const WrapEmpty = styled.div`
  height: 100%;
  & > div {
    height: 100%;
  }
`;

const MATCHES = gql`
  query MapaRelationships(
    $rows: Int!
    $offset: Int!
    $status: String_comparison_exp
    $order_by: [solidarity_matches_order_by!]
    $created_at: timestamp_comparison_exp
  ) {
    solidarity_matches(
      limit: $rows
      offset: $offset
      order_by: $order_by
      where: {
        created_at: $created_at
        _and: [
          { status: { _neq: "solicitação_recebida" } }
          { status: { _neq: "solicitação_repetida" } }
          { status: $status }
        ]
      }
    ) {
      volunteersUserId: volunteers_user_id
      individualsUserId: individuals_user_id
      individualsTicketId: individuals_ticket_id
      volunteersTicketId: volunteers_ticket_id
      created_at
    }
  }
`;

type MatchesData = {
  solidarity_matches: Array<{
    volunteersUserId: number;
    individualsUserId: number;
    individualsTicketId: number;
    volunteersTicketId: number;
    created_at: number;
  }>;
};

const USERS = gql`
  query MapaUsers(
    $state: String_comparison_exp
    $requesters: [solidarity_users_bool_exp]!
  ) {
    users: solidarity_users(where: { state: $state, _or: $requesters }) {
      first_name: name
      organization_id
      user_id
      state
      phone
      whatsapp
    }
    usersCount: solidarity_users_aggregate(
      where: { state: $state, _or: $requesters }
    ) {
      aggregate {
        count
      }
    }
  }
`;

type UsersData = {
  users: Array<{
    name: string;
    whatsapp: string;
    state: string;
    phone: string;
    organization_id: number;
    user_id: number;
  }>;
  usersCount: {
    aggregate: {
      count: number;
    };
  };
};

const FetchMatches = (props: any) => {
  const { children, _community } = props;
  const { relationships, page: _, ...pagination } = useFilterState();

  const { relationshipStatus, state, _query } = getSelectValues(relationships);

  const ticketVariables = {
    status: {
      _eq: relationshipStatus,
    },
    ...pagination,
    // created_at: {
    //   _eq: created_at,
    // };
  };

  const {
    loading: loadingMatches,
    error: matchesError,
    data: matchesData,
  } = useQuery<MatchesData>(MATCHES, { variables: ticketVariables });

  const usersMatches = matchesData?.solidarity_matches
    .map(({ individualsUserId, volunteersUserId }) => [
      individualsUserId,
      volunteersUserId,
    ])
    .flat(2);

  // const conditionals = [{ name: { _ilike: query } }, { email: { _ilike: query } }]

  const userVariables = {
    state: {
      _eq: typeof state === "string" ? state.toUpperCase() : state,
    },
    // query: `%${query || ""}%`,
    requesters: usersMatches?.map((id) => ({
      user_id: {
        _eq: id,
      },
    })),
  };

  const { loading: loadingUsers, error: userError, data: userData } = useQuery<
    UsersData
  >(USERS, { variables: userVariables });

  if (loadingMatches || loadingUsers) return <p>Loading...</p>;
  if (matchesError || userError) {
    console.log("error", matchesError || userError);
    return <p>Error</p>;
  }

  const data = fuseTicketsWithUsers(
    matchesData?.solidarity_matches as any,
    userData?.users as any
  );
  console.log({ data });
  const groups = [
    {
      isVolunteer: true,
      name: "Psicólogas",
    },
    {
      isVolunteer: true,
      name: "Advogadas",
    },
    {
      isVolunteer: false,
      name: "MSRs",
    },
  ];

  return children({
    relationships: data,
    relationshipsCount: userData?.usersCount.aggregate.count,
    groups,
  });
};

export default (props: any = {}) => {
  const { community } = useSession();
  return community ? (
    <FetchMatches community={community} {...props} />
  ) : (
    <WrapEmpty>
      <Empty message="Selecione uma comunidade" />
    </WrapEmpty>
  );
};
