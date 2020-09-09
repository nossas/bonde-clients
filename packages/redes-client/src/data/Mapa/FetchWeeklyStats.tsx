import React from "react";
import styled from "styled-components";
import { useSession, useQuery, gql } from "bonde-core-tools";
import { Empty } from "bonde-components";
import { zendeskOrganizations } from "../../services/utils";
import { WeeklyStatsData, WeeklyStatsVars } from "../../types";

const WrapEmpty = styled.div`
  height: 100%;
  & > div {
    height: 100%;
  }
`;

const WEEKLY_DATA = gql`
  query WeeklyData(
    $lastWeek: timestamp_comparison_exp
    $context: Int_comparison_exp
    $individualOrganizationId: bigint
  ) {
    newRecipients: form_entries_aggregate(
      where: {
        cached_community_id: $context
        widget_id: { _in: [3297, 16850, 62625] }
        created_at: $lastWeek
      }
    ) {
      aggregate {
        count
      }
    }
    encaminhamentosRealizados: solidarity_tickets_aggregate(
      where: {
        status_acolhimento: { _eq: "encaminhamento__realizado" }
        status: { _nin: ["closed", "solved", "deleted"] }
        updated_at: $lastWeek
        organization_id: { _eq: $individualOrganizationId }
      }
    ) {
      aggregate {
        count
      }
    }
    encaminhamentosServicoPublico: solidarity_tickets_aggregate(
      where: {
        status_acolhimento: {
          _eq: "encaminhamento__realizado_para_serviço_público"
        }
        status: { _nin: ["closed", "solved", "deleted"] }
        updated_at: $lastWeek
        organization_id: { _eq: $individualOrganizationId }
      }
    ) {
      aggregate {
        count
      }
    }
    atendimentosIniciados: solidarity_tickets_aggregate(
      where: {
        status_acolhimento: { _eq: "atendimento__iniciado" }
        status: { _nin: ["closed", "solved", "deleted"] }
        updated_at: $lastWeek
        organization_id: { _eq: $individualOrganizationId }
      }
    ) {
      aggregate {
        count
      }
    }
    newlyApprovedVolunteers: solidarity_users_aggregate(
      where: {
        condition: { _eq: "aprovada" }
        updated_at: $lastWeek
        organization_id: { _neq: $individualOrganizationId }
      }
    ) {
      aggregate {
        count
      }
    }
    newlyAvailableVolunteers: solidarity_users_aggregate(
      where: {
        condition: { _eq: "disponivel" }
        updated_at: $lastWeek
        organization_id: { _neq: $individualOrganizationId }
      }
    ) {
      aggregate {
        count
      }
    }
  }
`;

const FetchWeeklyStats = ({ children, timestamp, community }: any) => {
  const variables = {
    lastWeek: {
      _gte: timestamp,
    },
    individualOrganizationId: zendeskOrganizations["individual"],
    context: {
      _eq: community.id,
    },
  };

  const { loading, error, data } = useQuery<WeeklyStatsData, WeeklyStatsVars>(
    WEEKLY_DATA,
    {
      variables,
    }
  );

  if (loading) return <p>Loading...</p>;
  if (error) {
    console.log("error", error);
    return <p>Error</p>;
  }

  return children(data);
};

export default function CheckCommunity(props: any = {}): React.ReactElement {
  const { community } = useSession();
  const today = new Date();
  // get last week and format
  const lastWeek = new Date().setDate(today.getDate() - 7);
  // format lastWeek timestamp
  const timestamp = new Date(lastWeek).toISOString();
  return community ? (
    <FetchWeeklyStats community={community} timestamp={timestamp} {...props} />
  ) : (
    <WrapEmpty>
      <Empty message="Selecione uma comunidade" />
    </WrapEmpty>
  );
}

CheckCommunity.displayName = "CheckCommunityMatches";
