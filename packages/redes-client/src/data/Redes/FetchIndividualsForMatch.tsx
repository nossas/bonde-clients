import React from "react";
import { gql, useQuery } from "bonde-core-tools";
import styled from "styled-components";
import { Loading } from "bonde-components";

import { CheckCommunity } from "../../components";
import { REDE_INDIVIDUAL } from "../../graphql/IndividualFragment.graphql";
import { useFilterState } from "../../services/FilterProvider";
import { Individual } from "../../types";

const WrapLoading = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
`;

const INDIVIDUALS_FOR_MATCH = gql`
  query IndividualsForMatch(
    $isVolunteer: Boolean_comparison_exp
    $rows: Int!
    $offset: Int!
    $context: Int_comparison_exp!
  ) {
    individuals: rede_individuals(
      where: {
        status: { _eq: "aprovada" }
        availability: { _eq: "disponível" }
        group: { is_volunteer: $isVolunteer, community_id: $context }
        email: { _is_null: false }
        first_name: { _is_null: false }
        state: { _neq: "ZERO_RESULTS" }
        city: { _neq: "ZERO_RESULTS" }
        _or: [{ phone: { _is_null: false } }, { whatsapp: { _is_null: false } }]
      }
      limit: $rows
      offset: $offset
      order_by: { created_at: asc }
    ) {
      ...individual
    }
    individualsCount: rede_individuals_aggregate(
      where: {
        status: { _eq: "aprovada" }
        availability: { _eq: "disponível" }
        group: { is_volunteer: $isVolunteer, community_id: $context }
        email: { _is_null: false }
        first_name: { _is_null: false }
        state: { _neq: "ZERO_RESULTS" }
        city: { _neq: "ZERO_RESULTS" }
        _or: [{ phone: { _is_null: false } }, { whatsapp: { _is_null: false } }]
      }
    ) {
      aggregate {
        count
      }
    }
  }
  ${REDE_INDIVIDUAL}
`;

type Props = {
  children: any;
  group: { isVolunteer: boolean };
  community: {
    id: number;
  };
};

export type IndividualsData = {
  individuals: Array<Individual>;
  individualsCount: {
    aggregate: {
      count: number;
    };
  };
};

type IndividualsVars = {
  isVolunteer: { _eq: boolean };
  rows: number;
  offset: number;
  context: {
    _eq: number;
  };
};

const FetchIndividualsForMatch = ({
  children,
  group: { isVolunteer },
  community
}: Props) => {
  const { rows, offset } = useFilterState();
  const { loading, error, data } = useQuery<IndividualsData, IndividualsVars>(
    INDIVIDUALS_FOR_MATCH,
    {
      variables: {
        rows,
        offset,
        isVolunteer: {
          _eq: !isVolunteer,
        },
        context: {
          _eq: community && community.id
        }
      },
    }
  );

  if (loading)
    return (
      <WrapLoading>
        <Loading />
      </WrapLoading>
    );
  if (error) {
    console.log("error", error);
    return <p>Error</p>;
  }

  return children({
    data: data?.individuals,
    count: data?.individualsCount?.aggregate.count,
  });
};

FetchIndividualsForMatch.displayName = "FetchIndividualsForMatch";

// eslint-disable-next-line react/display-name
export default function (props: any = {}): React.ReactElement {
  return <CheckCommunity Component={FetchIndividualsForMatch} {...props} />;
}
