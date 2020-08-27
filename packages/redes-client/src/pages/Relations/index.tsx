import React from "react";
import { Header } from "bonde-components";
// import { useSession } from "bonde-core-tools";
import { Table, Filters } from "../../components";
import { useFilter } from "../../services/FilterProvider";
import columns from "./columns";

type Props = {
  loading?: boolean;
  error?: any;
  data: {
    FetchMatches: ({
      children,
    }: {
      children: (data: {
        relationships: Array<any>;
        groups: Array<{ is_volunteer: boolean; name: string }>;
        relationships_count: number;
      }) => React.ReactElement;
    }) => React.ReactElement | null;
    FilterOptions: {
      [x: string]: { label: string; value: string | number }[];
    };
  };
};

export default ({
  data: { FetchMatches, FilterOptions },
}: Props): React.ReactElement => {
  const [state, dispatch] = useFilter();

  const save = async (values: any) => {
    console.log({ values });
    return dispatch({ type: "relationships", value: values });
  };

  const reset = () =>
    dispatch({
      type: "relationships",
      value: {
        query: undefined,
        state: undefined,
        agent: undefined,
        relationshipStatus: undefined,
      },
    });

  return (
    <>
      <Filters
        save={save}
        options={FilterOptions}
        initialValues={state.relationships}
        reset={reset}
        searchPlaceholder="Buscar nome, email..."
        search
        state
        agent
        relationshipStatus
      />
      <FetchMatches>
        {({ groups, relationships, relationships_count }) => {
          const pagination = {
            totalPages: Math.round(relationships_count / state.rows),
            goToPage: (e: number) => dispatch({ type: "page", value: e }),
            setPageSize: (e: number) => dispatch({ type: "rows", value: e }),
            pageIndex: state.page,
            pageSize: state.rows,
          };

          return relationships_count < 1 ? (
            <Header.H4>
              Não existem conexões realizadas nessa comunidade.
            </Header.H4>
          ) : groups.length < 2 ? (
            <Header.H4>
              Não existem grupos suficientes nessa comunidade.
            </Header.H4>
          ) : (
            <>
              <Header.H4>Total ({relationships_count})</Header.H4>
              <Table
                data={relationships}
                columns={columns(groups)}
                sticky="end"
                pagination={pagination}
              />
            </>
          );
        }}
      </FetchMatches>
    </>
  );
};
