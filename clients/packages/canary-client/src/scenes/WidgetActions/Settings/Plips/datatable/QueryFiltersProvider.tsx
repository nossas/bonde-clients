import React, { createContext, useContext, useState } from 'react';
import { gql, useQuery } from "bonde-core-tools";

export const QUERY = gql`
  query ($where: plips_bool_exp, $limit: Int!, $offset: Int!) {
    plips(
      where: $where,
      limit: $limit,
      offset: $offset
    ) {
      name: form_data(path: "name")
      email: form_data(path: "email")
      whatsapp: form_data(path: "whatsapp")
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

export interface DataQuery {
  // T generic type is query result like { plips: PlipForm[] }
  data?: any;
  loading: boolean;
  error?: any;
  // total is aggregate count without limit or offset
  total: number;
}

export interface LimitFilters {
  limit: number;
  onChangeLimit: (limit: number) => void;
}

// Page filters
export interface PageFilters {
  pages: number;
  pageIndex: number;
  onChangePage: (i: number) => void;
  onNextPage: () => void;
  onPreviousPage: () => void;
}

// Filters Status resolves only plips query
export type FilterStatus = 'pendentes' | 'inscritos' | 'concluidos' | 'todos';

export interface StatusFilters {
  status: FilterStatus;
  onChangeStatus: (status: FilterStatus) => void;
}

// State filters resolves only plips query
export interface StatesFilters {
  states: string[];
  onChangeStates: (states: string[]) => void;
}

// Signature filters resolves only plips query
export interface SignatureFilters {
  signatures?: number;
  onChangeSignatures: (signatures?: number) => void;
}

export interface QueryFilters extends
  DataQuery,
  LimitFilters,
  PageFilters,
  StatusFilters,
  StatesFilters,
  SignatureFilters {

  }

// PlipForm and PlipResult resolves only plips query
export interface PlipForm {
  name: string;
  email: string;
  whatsapp?: string;
  state: string;
  expected_signatures: number;
  confirmed_signatures?: number;
  created_at: string;
}

const dummyf = () => {
  console.log("dummyf");
}

const context = createContext<QueryFilters>({
  loading: true,
  total: 0,
  pages: 0,
  pageIndex: 0,
  onChangePage: dummyf,
  onNextPage: dummyf,
  onPreviousPage: dummyf,
  limit: 0,
  onChangeLimit: dummyf,
  status: 'todos',
  onChangeStatus: dummyf,
  states: [],
  onChangeStates: dummyf,
  onChangeSignatures: dummyf
});

interface VariablesOpts {
  widgetId: number;
  limit?: number;
  pageIndex?: number;
  status?: FilterStatus;
  states: string[];
  signatures?: number;
}

export const createVariables = ({
  widgetId,
  limit,
  pageIndex,
  status,
  states,
  signatures
}: VariablesOpts): any => {
  // Pagination default
  const variables: any = limit !== undefined  && pageIndex !== undefined ? {
    offset: limit * pageIndex,
    limit
  } : {}

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
  } else if (status === 'concluidos') {
    where['confirmed_signatures'] = { _is_null: false };
  }

  // States filter
  if (states.length > 0) {
    where['_and'] = {
      '_or': states.map((state) => ({
        'state': { '_eq': state } 
      }))
    }
  }

  // Signatures filter
  if (signatures) {
    where['expected_signatures'] = { _eq: signatures };
  }

  return { ...variables, where };
}

interface Props {
  widgetId: number;
}

const QueryFiltersProvider: React.FC<Props> = ({ children, widgetId }) => {
  // Limit
  const [limit, setLimit] = useState(10);
  // Pagination
  const [pageIndex, setPageIndex] = useState(0);
  // Status
  const [status, setStatus] = useState<FilterStatus>('todos');
  const [states, setStates] = useState<string[]>([]);
  const [signatures, setSignatures] = useState<number>();
  // Fetch query
  const { data, loading, error, refetch } = useQuery(QUERY, {
    variables: createVariables({ widgetId, limit, pageIndex, status, states, signatures })
  });

  const total = data?.plips_aggregate.aggregate.count || 0;
  const pages = Math.round(total / limit) - 1;

  return (
    <context.Provider
      value={{
        data,
        loading,
        error,
        total,
        pageIndex,
        pages: pages === -1 ? 0 : pages,
        onChangePage: (i: number) => {
          if (i !== pageIndex) {
            refetch(createVariables({ widgetId, limit, pageIndex: i, status, states }));
            setPageIndex(i)
          }
        },
        onNextPage: () => {
          const newPageIndex = pageIndex + 1;
          if (newPageIndex <= total) {
            refetch(createVariables({ widgetId, limit, pageIndex: newPageIndex, status, states }));
            setPageIndex(newPageIndex)
          }
        },
        onPreviousPage: () => {
          const newPageIndex = pageIndex - 1;
          if (newPageIndex >= 0) {
            refetch(createVariables({ widgetId, limit, pageIndex: newPageIndex, status, states }));
            setPageIndex(newPageIndex);
          }
        },
        limit,
        onChangeLimit: (i: number) => {
          refetch(createVariables({ widgetId, limit: i, pageIndex: 0, status, states }));
          setLimit(i);
          setPageIndex(0);
        },
        status,
        onChangeStatus: (i: FilterStatus) => {
          refetch(createVariables({ widgetId, limit, pageIndex: 0, status: i, states }));
          setPageIndex(0);
          setStatus(i);
        },
        states,
        onChangeStates: (i: string[]) => {
          refetch(createVariables({ widgetId, limit, pageIndex: 0, status, states: i }));
          setPageIndex(0);
          setStates(i);
        },
        signatures,
        onChangeSignatures: (i?: number) => {
          if (i !== signatures) {
            refetch(createVariables({ widgetId, limit, pageIndex: 0, status, states }))
            setPageIndex(0);
            setSignatures(i);
          }
        }
      }}
    >
      {children}
    </context.Provider>
  );
}

export default QueryFiltersProvider;

export const useQueryFiltersData = (): DataQuery => {
  const { data, loading, error, total } = useContext(context);

  return { data, loading, error, total };
}

export const useQueryFiltersPage = (): PageFilters => {
  const { pages, pageIndex, onChangePage, onNextPage, onPreviousPage } = useContext(context);

  return { pages, pageIndex, onChangePage, onNextPage, onPreviousPage };
}

export const useQueryFiltersLimit = (): LimitFilters => {
  const { limit, onChangeLimit } = useContext(context);

  return { limit, onChangeLimit };
}

export interface FieldFilters extends
  StatusFilters,
  StatesFilters,
  SignatureFilters {

  }

export const useQueryFiltersFields = (): FieldFilters => {
  const {
    status,
    onChangeStatus,
    states,
    onChangeStates,
    signatures,
    onChangeSignatures
  } = useContext(context);

  return {
    status,
    onChangeStatus,
    states,
    onChangeStates,
    signatures,
    onChangeSignatures
  };
}