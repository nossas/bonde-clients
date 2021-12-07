import { useQuery, gql } from "bonde-core-tools";

const PLIP_PERFORMANCE_QUERY = gql`
  query ($widget_id: Int!, $created_at: timestamptz) {
    total_subscribers: plips_aggregate(
      where: {
        widget_id: { _eq: $widget_id }
      }
    ) {
      aggregate {
        count
      }
    }
    
    pending_subscribers: plips_aggregate(
      where: {
        widget_id: { _eq: $widget_id },
        confirmed_signatures: { _is_null: true },
        created_at: { _lte: $created_at }
      }
    ) {
      aggregate {
        count
      }
    }
    
    pending_signatures: plips_aggregate(
      where: {
        widget_id: { _eq: $widget_id },
        confirmed_signatures: { _is_null: true }
      }
    ) {
      aggregate {
        sum {
          expected_signatures
        }
      }
    }
    
    confirmed_signatures: plips_aggregate(
      where: {
        widget_id: { _eq: $widget_id },
        confirmed_signatures: { _is_null: false }
      }
    ) {
      aggregate {
        confirmed_subscribers: count
        sum {
          confirmed_signatures
        }
      }
    }
    
    states_signatures: plips_by_state(
      where: {
        widget_id: { _eq: $widget_id }
      }
    ) {
      state
      expected_signatures
      confirmed_signatures
      subscribers
    }
  }
`;

export interface StateSignature {
  state: any;
  expected_signatures: number;
  confirmed_signatures: number;
  subscribers: number;
}

interface ResultData {
  total_subscribers: {
    aggregate: {
      count: number;
    }
  };
  pending_subscribers: {
    aggregate: {
      count: number;
    }
  };
  pending_signatures: {
    aggregate: {
      sum: {
        expected_signatures: number;
      }
    }
  };
  confirmed_signatures: {
    aggregate: {
      confirmed_subscribers: number;
      sum: {
        confirmed_signatures: number;
      }
    }
  };
  states_signatures: StateSignature[];
}

interface ResultQuery<T> {
  data?: T;
  loading: boolean;
  error?: any;
}

export interface PerformanceData {
  total_subscribers: number;
  pending_subscribers: number;
  confirmed_subscribers: number;
  pending_signatures: number;
  confirmed_signatures: number;
  states_signatures: StateSignature[]
}

export const usePerformanceQuery = (widget_id: number): ResultQuery<PerformanceData> => {
  const { data, loading, error }: ResultQuery<ResultData> = useQuery(PLIP_PERFORMANCE_QUERY, {
    variables: {
      widget_id: widget_id,
      created_at: "2021-11-07 16:06:00"
    }
  });

  if (data) {
    return {
      loading,
      error,
      data: {
        total_subscribers: data.total_subscribers.aggregate.count,
        pending_subscribers: data.pending_subscribers.aggregate.count,
        confirmed_subscribers: data.confirmed_signatures.aggregate.confirmed_subscribers,
        pending_signatures: data.pending_signatures.aggregate.sum.expected_signatures,
        confirmed_signatures: data.confirmed_signatures.aggregate.sum.confirmed_signatures,
        states_signatures: data.states_signatures
      }
    }
  }

  return { loading, error, data };
}