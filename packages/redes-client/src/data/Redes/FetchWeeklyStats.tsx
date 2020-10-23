import React from "react";
import { useSession, useQuery, gql } from "bonde-core-tools";
import { useCommunityExtra } from "../../services/CommunityExtraProvider";
import { WeeklyStatsData, RedesWeeklyStatsVars, Groups } from "../../types";

const WEEKLY_DATA = gql`
  query WeeklyData(
    $lastWeek: timestamp_comparison_exp!
    $context: Int_comparison_exp!
    $widgets: Int_comparison_exp!
  ) {
    newRecipients: form_entries_aggregate(
      where: {
        cached_community_id: $context
        widget_id: $widgets
        created_at: $lastWeek
      }
    ) {
      aggregate {
        count
      }
    }
    encaminhamentosRealizados: rede_relationships_aggregate(
      where: {
        status: { _eq: "encaminhamento_realizado" }
        created_at: $lastWeek
        recipient: { group: { community_id: $context } }
      }
    ) {
      aggregate {
        count
      }
    }
    atendimentosIniciados: rede_relationships_aggregate(
      where: {
        status: { _eq: "atendimento_iniciado" }
        updated_at: $lastWeek
        recipient: { group: { community_id: $context } }
      }
    ) {
      aggregate {
        count
      }
    }
    newlyApprovedVolunteers: rede_individuals_aggregate(
      where: {
        status: { _eq: "aprovada" }
        updated_at: $lastWeek
        group: { community_id: $context }
      }
    ) {
      aggregate {
        count
      }
    }
    newlyAvailableVolunteers: rede_individuals_aggregate(
      where: {
        availability: { _eq: "disponivel" }
        updated_at: $lastWeek
        group: { community_id: $context }
      }
    ) {
      aggregate {
        count
      }
    }
  }
`;

type Props = {
  children: any;
  timestamp: string;
  community: {
    id: number;
  };
  groups: Groups;
};

const FetchWeeklyStats = ({
  children,
  timestamp,
  community,
  groups,
}: Props) => {
  const variables = {
    lastWeek: {
      _gte: timestamp,
    },
    context: {
      _eq: community.id,
    },
    widgets: {
      _in: groups.map((i) => i.widgetId),
    },
  };

  const { loading, error, data } = useQuery<
    WeeklyStatsData,
    RedesWeeklyStatsVars
  >(WEEKLY_DATA, {
    variables,
  });

  if (loading) return <p>Loading...</p>;
  if (error) {
    console.log("error", error);
    return <p>Error</p>;
  }

  return children({
    ...data,
    communityId: community.id,
  });
};

export default function CheckCommunity(props: any = {}): React.ReactElement {
  const { community } = useSession();
  const { groups } = useCommunityExtra();

  const today = new Date();
  // get last week and format
  const lastWeek = new Date().setDate(today.getDate() - 7);
  // format lastWeek timestamp
  const timestamp = new Date(lastWeek).toISOString();
  return (
    <FetchWeeklyStats
      community={community}
      groups={groups}
      timestamp={timestamp}
      {...props}
    />
  );
}

CheckCommunity.displayName = "CheckCommunityMatches";
