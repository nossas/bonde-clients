import React from "react";
import styled from "styled-components";
import { Header, Empty } from "bonde-components";
// import { useSession } from "bonde-core-tools";
import { Table, Filters } from "../../components";
import { useFilter } from "../../services/FilterProvider";
import columns from "./columns";

const WrapEmpty = styled.div`
  height: 100%;
  & > div {
    height: 100%;
  }
`;

type Props = {
  loading?: boolean;
  error?: any;
  data: {
    FetchMatches: ({
      children,
    }: {
      children: (data: {
        relationships: Array<any>;
        groups: Array<{ isVolunteer: boolean; name: string }>;
        relationshipsCount: number;
      }) => React.ReactElement;
    }) => React.ReactElement | null;
    FilterOptions: {
      [x: string]: { label: string; value: string | number }[];
    };
  };
};

export default function Relations({
  data: { FetchMatches, FilterOptions },
}: Props): React.ReactElement {
  const [state, dispatch] = useFilter();

  const save = async (values: any) => {
    // This needs to be done because when the text input is cleaned, it doesn't come as an `undefined` value, it's just not present and the previous state is maintained in the provider. Because of that, every time we dispatch the newValues, we need to clear them first.
    const newValues = {
      query: undefined,
      state: undefined,
      agent: undefined,
      relationshipStatus: undefined,
      ...values,
    };
    return dispatch({ type: "relationships", value: newValues });
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
        {({ groups, relationships, relationshipsCount }) => {
          const pagination = {
            totalPages: Math.round(relationshipsCount / state.rows),
            goToPage: (e: number) => dispatch({ type: "page", value: e }),
            setPageSize: (e: number) => dispatch({ type: "rows", value: e }),
            pageIndex: state.page,
            pageSize: state.rows,
          };

          return relationshipsCount < 1 ? (
            <WrapEmpty>
              <Empty message="Nada por aqui..." />
            </WrapEmpty>
          ) : groups.length < 2 ? (
            <WrapEmpty>
              <Empty message="Não existem grupos suficientes nessa comunidade." />
            </WrapEmpty>
          ) : (
            <>
              <Header.H4>Total ({relationshipsCount})</Header.H4>
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
}

Relations.displayName = "Relations";
