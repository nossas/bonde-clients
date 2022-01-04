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

export const useQueryFilters = (widgetId: number) => {
  const [limit, setLimit] = useState(10);
  const [pageIndex, setPageIndex] = useState(0)
  const [status, setStatus] = useState<'pendentes' | 'inscritos' | 'concluidos' | null>(null);
  const { data, loading, error, refetch } = useQuery(QUERY, {
    variables: {
      where: { widget_id: { _eq: widgetId } },
      offset: limit * pageIndex,
      limit
    }
  });

  return {
    data,
    limit,
    loading,
    error,
    status,
    onNextPage: () => {
      const newPageIndex = pageIndex + 1;
      refetch({
        where: { widget_id: { _eq: widgetId } },
        offset: limit * newPageIndex,
        limit
      });
      setPageIndex(newPageIndex)
    },
    onPreviousPage: () => {
      const newPageIndex = pageIndex - 1;
      if (newPageIndex >= 0) {
        refetch({
          where: { widget_id: { _eq: widgetId } },
          offset: limit * newPageIndex,
          limit
        });
        setPageIndex(newPageIndex)
      }
    },
    onChangeLimit: (i: number) => {
      refetch({
        where: { widget_id: { _eq: widgetId } },
        offset: 0,
        limit
      });
      setLimit(i);
      setPageIndex(0);
    },
    onChangeStatus: (status?: 'pendentes' | 'inscritos' | 'concluidos' | 'todos') => {
      if (status === 'pendentes') {
        refetch({
          where: {
            widget_id: { _eq: widgetId },
            confirmed_signatures: { _is_null: true },
            _or: [10, 20, 30, 40, 50, 100].map((value, index) => {
              const date = new Date();
              date.setDate(date.getDate() - (30 * (index + 1)));
              return {
                _and: [
                  { created_at: { _lte: date.toDateString() } },
                  { expected_signatures: { _eq: value } }
                ]
              }
            })
          },
          offset: 0,
          limit
        });
        setPageIndex(0);
        setStatus(status);
      } else if (status === 'inscritos') {
        refetch({
          where: {
            widget_id: { _eq: widgetId },
            confirmed_signatures: { _is_null: true },
            _or: [10, 20, 30, 40, 50, 100].map((value, index) => {
              const date = new Date();
              date.setDate(date.getDate() - (30 * (index + 1)));
              return {
                _and: [
                  { created_at: { _gte: date.toDateString() } },
                  { expected_signatures: { _eq: value } }
                ]
              }
            })
          },
          offset: 0,
          limit
        });
        setPageIndex(0);
        setStatus(status);
      } else if (status === 'todos') {
        refetch({
          where: {
            widget_id: { _eq: widgetId }
          },
          offset: 0,
          limit
        });
        setPageIndex(0);
        setStatus(null);
      } else if (status === 'concluidos') {
        refetch({
          where: {
            widget_id: { _eq: widgetId },
            confirmed_signatures: { _is_null: false }
          },
          offset: 0,
          limit
        });
        setPageIndex(0);
        setStatus(status);
      }
    }
  }
}