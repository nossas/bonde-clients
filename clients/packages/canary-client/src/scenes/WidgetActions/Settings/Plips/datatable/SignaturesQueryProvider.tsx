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
      status
    }
  }
`;

export interface DataQuery {
  data?: any;
  loading: boolean;
  error?: any;

}

export interface LimitFilters {
  limit: number;
  onChangeLimit: (limit: number) => void;
}

// Page filters
export interface PageFilters {
  pageIndex: number;
  onChangePage: (i: number) => void;
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
  pageIndex: 0,
  onChangePage: dummyf,
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
  limit,
  pageIndex,
  states,
  signatures,
  email
}: VariablesOpts): any => {
  // Pagination default
  const variables: any = limit !== undefined && pageIndex !== undefined ? {
    offset: limit * pageIndex,
    limit
  } : {}

  // Filters default
  const where: any = { widget_id: { _eq: widgetId }, _and: [] };

  // Email filter
  if (email !== undefined) {
    where['form_data'] = { _contains: { email: email } };
  }


  // States filter
  if (states.length > 0) {
    where['_and'].push({
      '_or': states.map((state) => ({
        'state': { '_eq': state }
      }))
    })
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

  const [states, setStates] = useState<string[]>([]);
  const [signatures, setSignatures] = useState<number>();
  // Email
  const [email, setEmail] = useState<string>();
  // Fetch query
  const { data, loading, error, refetch } = useQuery(QUERY, {
    variables: createVariables({ widgetId, limit, pageIndex, states, signatures, email })
  });


  return (
    <context.Provider
      value={{
        data,
        loading,
        error,
        pageIndex,
        onChangePage: (i: number) => {
          if (i !== pageIndex) {
            refetch(createVariables({ widgetId, limit, pageIndex: i, states, signatures, email }));
            setPageIndex(i)
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

export default QueryFiltersProvider;

export const useQueryFiltersData = (): DataQuery => {
  const { data, loading, error } = useContext(context);

  return { data, loading, error };
}

export const useQueryFiltersPage = (): PageFilters => {
  const { pageIndex, onChangePage, onPreviousPage } = useContext(context);

  return { pageIndex, onChangePage, onPreviousPage };
}

export const useQueryFiltersLimit = (): LimitFilters => {
  const { limit, onChangeLimit } = useContext(context);

  return { limit, onChangeLimit };
}

export interface FieldFilters extends
  StatesFilters,
  SignatureFilters,
  EmailFilters {

}

export const useQueryFiltersFields = (): FieldFilters => {
  const {
    states,
    onChangeStates,
    signatures,
    onChangeSignatures,
    email,
    onChangeEmail
  } = useContext(context);

  return {
    states,
    onChangeStates,
    signatures,
    onChangeSignatures,
    email,
    onChangeEmail
  };
}
