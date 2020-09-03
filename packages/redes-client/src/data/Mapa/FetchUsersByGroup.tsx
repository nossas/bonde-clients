import React from "react";
import { useSession, useQuery, gql } from "bonde-core-tools";
import { Empty } from "bonde-components";
import { useFilterState } from "../../services/FilterProvider";
import { getSelectValues, groupToOrganization } from "../../services/utils";
import { MapaGroupsData, GroupsVars } from "../../types";

export const INDIVIDUALS_BY_GROUP = gql`
  query Individuals(
    $rows: Int!
    $offset: Int!
    $order_by: [solidarity_tickets_order_by!]
    $status: String_comparison_exp
    $state: String_comparison_exp
    $availability: String_comparison_exp
    $individualId: bigint_comparison_exp
    $query: String
  ) {
    data: solidarity_tickets(
      where: {
        status_inscricao: $status
        individual: {
          condition: $availability
          state: $state
          organization_id: $individualId
          _or: [
            { name: { _ilike: $query } }
            { email: { _ilike: $query } }
            { occupation_area: { _ilike: $query } }
          ]
        }
      }
      limit: $rows
      offset: $offset
      order_by: $order_by
    ) {
      ...individual
    }
    count: solidarity_tickets_aggregate(
      where: {
        status_inscricao: $status
        individual: {
          condition: $availability
          state: $state
          organization_id: $individualId
          _or: [
            { name: { _ilike: $query } }
            { email: { _ilike: $query } }
            { occupation_area: { _ilike: $query } }
          ]
        }
      }
    ) {
      aggregate {
        count
      }
    }
  }

  fragment individual on solidarity_tickets {
    id: ticket_id
    individual {
      id: user_id
      firstName: name
      email
      whatsapp
      phone
      zipcode: cep
      address
      city
      latitude
      longitude
      state
      availability: condition
      formEntryId: external_id
      tipoDeAcolhimento: tipo_de_acolhimento
      createdAt: data_de_inscricao_no_bonde
      encaminhamentosRealizados: encaminhamentos_realizados_calculado_
      atendimentosConcluidos: atendimentos_concludos_calculado_
      atendimentosEmAndamento: atendimentos_em_andamento_calculado_
    }
    status: status_inscricao
    createdAt: created_at
    updateAt: updated_at
    organizationId: organization_id
  }
`;

const FetchUsersByGroup = ({ children }: any) => {
  const { individuals, rows, offset } = useFilterState();

  const { userStatus, availability, state, group, query } = getSelectValues(
    individuals
  );

  const variables = {
    status: {
      _eq: userStatus,
    },
    availability: {
      _eq: availability,
    },
    state: {
      _eq: state,
    },
    query: `%${query || ""}%`,
    individualId: { _eq: groupToOrganization[group as number] },
    rows,
    offset,
    // created_at: {
    //   _eq: created_at,
    // };
  };

  const { loading, error, data } = useQuery<MapaGroupsData, GroupsVars>(
    INDIVIDUALS_BY_GROUP,
    {
      variables,
    }
  );

  if (error) {
    console.log("error", error);
    return <p>Error</p>;
  }
  if (loading) return <p>Loading...</p>;

  return children({
    ...data,
    count: data?.count.aggregate.count,
  });
};

export default function CheckCommunity(props: any): React.ReactElement {
  const { community } = useSession();

  return community ? (
    <FetchUsersByGroup community={community} {...props} />
  ) : (
    <Empty message="Selecione uma comunidade" />
  );
}

CheckCommunity.displayName = "CheckCommunity";
