import React from "react";
import { gql } from "bonde-core-tools";
import { CheckCommunity, FetchDataFromGraphql } from "../../components";
import { useFilterState } from "../../services/FilterProvider";
import { getSelectValues } from "../../services/utils";

export const INDIVIDUALS_BY_GROUP = gql`
  query Individuals(
    $rows: Int!
    $offset: Int!
    $order_by: [rede_individuals_order_by!]
    $userStatus: String_comparison_exp
    $state: String_comparison_exp
    $availability: String_comparison_exp
    $redeGroupId: Int_comparison_exp
    $query: String
  ) {
    data: rede_individuals(
      where: {
        status: $userStatus
        availability: $availability
        state: $state
        rede_group_id: $redeGroupId
        _or: [
          { first_name: { _ilike: $query } }
          { last_name: { _ilike: $query } }
          { email: { _ilike: $query } }
        ]
      }
      limit: $rows
      offset: $offset
      order_by: $order_by
    ) {
      ...individual
    }
    individualsCount: rede_individuals_aggregate(
      where: {
        status: $userStatus
        availability: $availability
        state: $state
        rede_group_id: $redeGroupId
        _or: [
          { first_name: { _ilike: $query } }
          { last_name: { _ilike: $query } }
          { email: { _ilike: $query } }
        ]
      }
    ) {
      aggregate {
        count
      }
    }
  }

  fragment individual on rede_individuals {
    id
    firstName: first_name
    lastName: last_name
    email
    whatsapp
    phone
    zipcode
    address
    city
    state
    coordinates
    availability
    formEntryId: form_entry_id
    userStatus: status
    createdAt: created_at
    updateAt: updated_at
  }
`;

const FetchIndividuals = (props: any = {}) => {
  const { individuals, rows, offset, group } = useFilterState();

  const { userStatus, availability, state, query } = getSelectValues(
    individuals
  );

  const variables = {
    userStatus: {
      _eq: userStatus,
    },
    availability: {
      _eq: availability,
    },
    state: {
      _eq: state,
    },
    query: `%${query || ""}%`,
    redeGroupId: {
      _eq: group && group.value,
    },
    rows,
    offset,
    // created_at: {
    //   _eq: created_at,
    // };
  };

  return (
    <FetchDataFromGraphql
      variables={variables}
      query={INDIVIDUALS_BY_GROUP}
      {...props}
    />
  );
};

FetchIndividuals.displayName = "FetchIndividuals";

// eslint-disable-next-line react/display-name
export default function (props: any = {}): React.ReactElement {
  return <CheckCommunity Component={FetchIndividuals} {...props} />;
}
