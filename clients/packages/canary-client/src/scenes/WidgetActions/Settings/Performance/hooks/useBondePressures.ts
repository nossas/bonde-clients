import { useQuery, gql } from "bonde-core-tools";
import { Widget } from "../../../FetchWidgets";

type Props = {
  widget: Widget
}

type OutputProps = {
  data: {
    // Contagem de pressões
    pressuresAggregateCount: number
    // Contagem de alvos
    pressureTargetsCount: number
  }
  loading: boolean
  error: any
}

// Tipagem da query
type BondePressures = {
  activist_pressures_aggregate: {
    aggregate: {
      count: number
    }
  }
  widgets: {
    pressure_targets: string[] | string
  }[]
}

// Query da contagem de pressões e contagem de alvos
const PRESSURES_AND_TARGETS_COUNT = gql`
  query activist_pressures ($widgetId: Int!) {
    activist_pressures_aggregate(where: {
      widget_id: {
        _eq: $widgetId
      }
    }) {
      aggregate {
        count
      }
    }
  }
`;

export function useBondePressures({ widget }: Props): OutputProps {

  const { data, loading, error } = useQuery(PRESSURES_AND_TARGETS_COUNT, {
    variables: {
      widgetId: widget.id,
    }
  });

  if (loading) {
    return {
      data,
      loading,
      error,
    }
  }

  const { activist_pressures_aggregate } = data as BondePressures

  const pressuresAggregateCount = activist_pressures_aggregate.aggregate.count

  let pressureTargetsCount;

  if (widget.settings.pressure_type === 'unique') {
    pressureTargetsCount = typeof widget.settings.targets === "string" // TODO: retorna string ou um array de strings
      ? widget.settings.targets.split(";").length
      : widget.settings.targets.length
  }
  else {
    pressureTargetsCount = widget.groups
      .map((group) => group.targets.length)
      .reduce((previous, current) => previous + current, 0)
  }

  return {
    data: {
      pressuresAggregateCount,
      pressureTargetsCount,
    },
    loading,
    error,
  }
}
