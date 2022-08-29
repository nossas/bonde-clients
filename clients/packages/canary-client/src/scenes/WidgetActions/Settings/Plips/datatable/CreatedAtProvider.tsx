import React, { createContext, useContext, useState } from 'react';
import { gql, useQuery } from "bonde-core-tools";

export const QUERY = gql`
query ($where: plip_signatures_bool_exp, $limit: Int!, $offset: Int!) {
  plip_signatures(where: $where, order_by: {created_at: desc}, limit: $limit, offset: $offset) {
    plips(distinct_on: unique_identifier) {
      created_at: created_at
   }
  }
  plip_signatures_aggregate(where: $where) {
   aggregate {
    count
   }
  }
}
`;

export interface DataQuery {
  // T generic type is query result like { plips: PlipForm[] }
  data2?: any;
  loading: boolean;
  error?: any;
  // total is aggregate count without limit or offset
  confirmedTotal: number;
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

// Email filters resolves only plips query
export interface EmailFilters {
  email?: string;
  onChangeEmail: (email?: string) => void
}

export interface QueryFilters extends
  DataQuery,
  LimitFilters,
  PageFilters,
  StatesFilters,
  SignatureFilters,
  EmailFilters {

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
  status: 'CONCLUIDO' | 'INSCRITO' | 'PENDENTE'
}

const dummyf = () => {
  console.log("dummyf");
}

const context = createContext<QueryFilters>({
  loading: true,
  confirmedTotal: 0,
  pages: 0,
  pageIndex: 0,
  onChangePage: dummyf,
  onNextPage: dummyf,
  onPreviousPage: dummyf,
  limit: 0,
  onChangeLimit: dummyf,
  states: [],
  onChangeStates: dummyf,
  onChangeSignatures: dummyf,
  onChangeEmail: dummyf
});

interface VariablesOpts {
  widgetId: number;
  limit?: number;
  pageIndex?: number;
  states: string[];
  signatures?: number;
  email?: string;
}

export const createVariables = ({
  widgetId,
}: VariablesOpts): any => {

  // Filters default
  const where: any = { widget_id: { _eq: widgetId }, _and: [] };

  return { where };
}

interface Props {
  widgetId: number;
}

const BCreatedAtFilterProvider: React.FC<Props> = ({ children, widgetId }) => {
  // Limit
  const [limit, setLimit] = useState(10);
  // Pagination
  const [pageIndex, setPageIndex] = useState(0);

  const [states, setStates] = useState<string[]>([]);
  const [signatures, setSignatures] = useState<number>();
  // Email
  const [email, setEmail] = useState<string>();
  // Fetch query
  const { data2, loading, error, refetch } = useQuery(QUERY, {

    variables: createVariables({ widgetId, limit, pageIndex, states, signatures, email })
  });


  const confirmedTotal = data2?.plip_signatures_aggregate.aggregate.count || 0;
  const pages = Math.round(confirmedTotal / limit) - 1;

  return (
    <context.Provider
      value={{
        data2,
        loading,
        error,
        confirmedTotal,
        pageIndex,
        pages: pages === -1 ? 0 : pages,
        onChangePage: (i: number) => {
          if (i !== pageIndex) {
            refetch(createVariables({ widgetId, limit, pageIndex: i, states, signatures, email }));
            setPageIndex(i)
          }
        },
        onNextPage: () => {
          const newPageIndex = pageIndex + 1;
          if (newPageIndex <= confirmedTotal) {
            refetch(createVariables({ widgetId, limit, pageIndex: newPageIndex, states, signatures, email }));
            setPageIndex(newPageIndex)
          }
        },
        onPreviousPage: () => {
          const newPageIndex = pageIndex - 1;
          if (newPageIndex >= 0) {
            refetch(createVariables({ widgetId, limit, pageIndex: newPageIndex, states, signatures, email }));
            setPageIndex(newPageIndex);
          }
        },
        limit,
        onChangeLimit: (i: number) => {
          refetch(createVariables({ widgetId, limit: i, pageIndex: 0, states, signatures, email }));
          setLimit(i);
          setPageIndex(0);
        },
        states,
        onChangeStates: (i: string[]) => {
          if (i !== states) {
            refetch(createVariables({ widgetId, limit, pageIndex: 0, states: i, signatures, email }));
            setPageIndex(0);
            setStates(i);
          }
        },
        signatures,
        onChangeSignatures: (i?: number) => {
          if (i !== signatures) {
            refetch(createVariables({ widgetId, limit, pageIndex: 0, states, signatures: i, email }))
            setPageIndex(0);
            setSignatures(i);
          }
        },
        email,
        onChangeEmail: (i?: string) => {
          if (i !== email) {
            refetch(createVariables({ widgetId, limit, pageIndex: 0, states, signatures, email: i }))
            setPageIndex(0);
            setEmail(i);
          }
        }
      }}
    >
      {children}
    </context.Provider>
  );
}

export default BCreatedAtFilterProvider;

export const useQueryBFiltersData = (): DataQuery => {
  const { data2, loading, error, confirmedTotal } = useContext(context);

  return { data2, loading, error, confirmedTotal };
}

export const useQueryBFiltersPage = (): PageFilters => {
  const { pages, pageIndex, onChangePage, onNextPage, onPreviousPage } = useContext(context);

  return { pages, pageIndex, onChangePage, onNextPage, onPreviousPage };
}

export const useQueryBFiltersLimit = (): LimitFilters => {
  const { limit, onChangeLimit } = useContext(context);

  return { limit, onChangeLimit };
}

export interface FieldFilters extends
  StatesFilters,
  SignatureFilters,
  EmailFilters {

}

