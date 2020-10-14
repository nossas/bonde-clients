import React from "react";
import { gql, useQuery } from "bonde-core-tools";
import { CheckCommunity } from "../../components";
import { useFilterState } from "../../services/FilterProvider";
import {
  getVolunteerOrganizationId,
  zendeskOrganizations,
  stripIndividualFromData,
} from "../../services/utils";
// import { MapaIndividual } from "../../types";

import styled from "styled-components";
import { Loading } from "bonde-components";
import {
  MAPA_INDIVIDUAL,
  MAPA_TICKET_INDIVIDUAL,
} from "../../graphql/IndividualFragment.graphql";

const WrapLoading = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
`;

const VOLUNTEERS_FOR_MATCH = gql`
  query VolunteersForMatch(
    $individualOrganizationId: bigint_comparison_exp!
    $lastMonth: timestamp_comparison_exp!
  ) {
    volunteers: solidarity_users(
      where: {
        condition: { _eq: "disponivel" }
        longitude: { _is_null: false }
        latitude: { _is_null: false }
        name: { _is_null: false }
        registration_number: { _is_null: false }
        atendimentos_em_andamento_calculado_: { _eq: 0 }
        state: { _neq: "int" }
        city: { _neq: "Internacional" }
        organization_id: $individualOrganizationId
        _or: [{ phone: { _is_null: false } }, { whatsapp: { _is_null: false } }]
      }
    ) {
      ...individual
    }
    pendingTickets: solidarity_matches(
      order_by: { created_at: desc }
      where: {
        created_at: $lastMonth
        status: { _eq: "encaminhamento__realizado" }
      }
    ) {
      volunteersUserId: volunteers_user_id
      volunteersTicketId: volunteers_ticket_id
      id
    }
  }
  ${MAPA_INDIVIDUAL}
`;

const RECIPIENTS_FOR_MATCH = gql`
  query RecipientsForMatch(
    $rows: Int!
    $offset: Int!
    $recipientOrganizationId: bigint_comparison_exp!
  ) {
    recipients: solidarity_tickets(
      limit: $rows
      offset: $offset
      where: {
        status: { _nin: ["deleted", "solved"] }
        status_acolhimento: {
          _in: [
            "solicitação_recebida"
            "encaminhamento__realizado_para_serviço_público"
          ]
        }
        individual: {
          organization_id: $recipientOrganizationId
          condition: { _eq: "inscrita" }
          latitude: { _is_null: false }
          longitude: { _is_null: false }
          email: { _is_null: false }
          name: { _is_null: false }
        }
      }
      order_by: { individual: { data_de_inscricao_no_bonde: asc } }
    ) {
      ...ticketIndividual
    }
    recipientsCount: solidarity_tickets_aggregate(
      where: {
        status: { _nin: ["deleted", "solved"] }
        status_acolhimento: {
          _in: [
            "solicitação_recebida"
            "encaminhamento__realizado_para_serviço_público"
          ]
        }
        individual: {
          organization_id: $recipientOrganizationId
          condition: { _eq: "inscrita" }
        }
      }
    ) {
      aggregate {
        count
      }
    }
  }
  ${MAPA_TICKET_INDIVIDUAL}
`;

type Props = {
  individual: any;
  children: any;
  monthlyTimestamp: string;
};

export type MatchTickets = {
  volunteersUserId: number;
  volunteersTicketId: number;
  id: number;
};

type MatchVolunteerIndividual = {
  id: number;
  atendimentosEmAndamento: number;
  email: string;
  name: string;
  organizationId: number;
  latitude: string;
  longitude: string;
  whatsapp: string;
  phone: string;
  registrationNumber: string;
  pending?: number;
  availability?: number;
};

const FetchIndividualsForMatch = ({
  individual,
  children,
  monthlyTimestamp,
}: Props) => {
  const { organizationId, subject } = individual;
  const { rows, offset } = useFilterState();

  const recipientVariables = {
    rows,
    offset,
    recipientOrganizationId: {
      _eq: zendeskOrganizations["individual"],
    },
  };
  const volunteerVariables = {
    individualOrganizationId: {
      _eq: getVolunteerOrganizationId(subject),
    },
    lastMonth: { _gte: monthlyTimestamp },
  };

  const variables =
    organizationId !== zendeskOrganizations["individual"]
      ? recipientVariables
      : volunteerVariables;

  const query =
    organizationId !== zendeskOrganizations["individual"]
      ? RECIPIENTS_FOR_MATCH
      : VOLUNTEERS_FOR_MATCH;

  const { loading, error, data } = useQuery(query, {
    variables,
  });

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

  const newData =
    data && data.volunteers
      ? data.volunteers
          .map((user: MatchVolunteerIndividual) => {
            const { id } = user;
            const countForwardings = data.pendingTickets.filter(
              (ticket: MatchTickets) => ticket.volunteersUserId === id
            ).length;

            const availability = 1 - (countForwardings || 0);

            return {
              ...user,
              ultimosEncaminhamentosRealizados: countForwardings,
              availability,
              coordinates: {
                latitude: user.latitude,
                longitude: user.longitude,
              },
            };
          })
          .filter(
            (user: MatchVolunteerIndividual) => (user.availability || 0) > 0
          )
      : undefined;

  return children(
    organizationId !== zendeskOrganizations["individual"]
      ? {
          data: stripIndividualFromData(data.recipients),
          count: data.recipientsCount.aggregate.count,
        }
      : { data: newData, count: newData.length }
  );
};

FetchIndividualsForMatch.displayName = "FetchIndividualsForMatch";

// eslint-disable-next-line react/display-name
export default function (props: any = {}): React.ReactElement {
  return <CheckCommunity Component={FetchIndividualsForMatch} {...props} />;
}
