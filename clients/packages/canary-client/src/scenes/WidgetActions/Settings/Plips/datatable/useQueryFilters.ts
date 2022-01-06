import { useState } from 'react';
import { gql } from "bonde-core-tools";
import { useQuery } from 'bonde-core-tools';

const QUERY = gql`
  query ($where: plips_bool_exp, $limit: Int!, $offset: Int!) {
    plips(
      where: $where,
      limit: $limit,
      offset: $offset
    ) {
      name: form_data(path: "name")
      email: form_data(path: "email")
      state
      expected_signatures
      confirmed_signatures
      created_at
    }

    plips_aggregate(where: $where) {
      aggregate {
        count
      }
    }
  }
`;

export interface PlipForm {
  name: string;
  email: string;
  state: string;
  expected_signatures: number;
  confirmed_signatures?: number;
  created_at: string;
}

export type FilterStatus = 'pendentes' | 'inscritos' | 'concluidos' | 'todos';
export type FilterState = 'ES' | 'AC' | 'PE' | 'todos';

export interface DataQueryFilters {
  // Fetch query
  data: { plips: PlipForm[] };
  loading: boolean;
  error?: any;
  total: number;
  // Limit filters
  limit: number;
  onChangeLimit: (limit: number) => void;
  // Status filters
  status: FilterStatus;
  onChangeStatus: (status: FilterStatus) => void;
  // State filters
  // state: FilterState;
  // onChangeState: (state: FilterState) => void;
  // Page filters
  pages: number;
  pageIndex: number;
  onNextPage: () => void;
  onPreviousPage: () => void;
}

interface Variables {
  where: any;
  offset: number;
  limit: number;
}

type Refetch = (args: any) => void

interface Opts {
  defaultLimit?: number;
}

interface VariablesOpts {
  widgetId: number;
  limit: number;
  pageIndex: number;
  status?: FilterStatus;
}

const createVariables = ({ widgetId, limit, pageIndex, status }: VariablesOpts) => {
  // Pagination default
  const variables: any = {
    offset: limit * pageIndex,
    limit
  }
  // Filters default
  const where: any = { widget_id: { _eq: widgetId } };

  // Status filter
  if (status === 'pendentes') {
    where['confirmed_signatures'] = { _is_null: true };
    where['_or'] = [10, 20, 30, 40, 50, 100].map((value, index) => {
      const date = new Date();
      date.setDate(date.getDate() - (30 * (index + 1)));
      return {
        _and: [
          { created_at: { _lte: date.toDateString() } },
          { expected_signatures: { _eq: value } }
        ]
      }
    })
    // Change offset when change status
    variables['offset'] = 0;
  } else if (status === 'inscritos') {
    where['confirmed_signatures'] = { _is_null: true };
    where['_or'] = [10, 20, 30, 40, 50, 100].map((value, index) => {
      const date = new Date();
      date.setDate(date.getDate() - (30 * (index + 1)));
      return {
        _and: [
          { created_at: { _gte: date.toDateString() } },
          { expected_signatures: { _eq: value } }
        ]
      }
    })
    // Change offset when change status
    variables['offset'] = 0;
  } else if (status === 'todos') {
    // Change offset when change status
    variables['offset'] = 0;
  } else if (status === 'concluidos') {
    where['confirmed_signatures'] = { _is_null: false };
    // Change offset when change status
    variables['offset'] = 0;
  }

  return { ...variables, where };
}

export const useQueryFilters = (widgetId: number, opts?: Opts): DataQueryFilters => {
  // Limit
  const [limit, setLimit] = useState(opts?.defaultLimit || 10);
  // Pagination
  const [pageIndex, setPageIndex] = useState(0);
  // Status
  const [status, setStatus] = useState<FilterStatus>('todos');
  // Fetch query
  const { data, loading, error, refetch } = useQuery(QUERY, {
    variables: createVariables({ widgetId, limit, pageIndex, status })
  });
  
  const total = data?.plips_aggregate.aggregate.count || 0;
  const pages = Math.round(total / limit) - 1;

  return {
    data,
    loading,
    error,
    total,
    pageIndex,
    pages: pages === -1 ? 0 : pages,
    onNextPage: () => {
      const newPageIndex = pageIndex + 1;
      if (newPageIndex <= total) {
        refetch(createVariables({ widgetId, limit, pageIndex: newPageIndex, status }));
        setPageIndex(newPageIndex)
      }
    },
    onPreviousPage: () => {
      const newPageIndex = pageIndex - 1;
      if (newPageIndex >= 0) {
        refetch(createVariables({ widgetId, limit, pageIndex: newPageIndex, status }));
        setPageIndex(newPageIndex);
      }
    },
    limit,
    onChangeLimit: (i: number) => {
      refetch(createVariables({ widgetId, limit: i, pageIndex: 0, status }));
      setLimit(i);
      setPageIndex(0);
    },
    status,
    onChangeStatus: (i: FilterStatus) => {
      refetch(createVariables({ widgetId, limit, pageIndex: 0, status: i }));
      setPageIndex(0);
      setStatus(i);
    }
  }
}