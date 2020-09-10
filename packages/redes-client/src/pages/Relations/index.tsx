import React from "react";
import styled from "styled-components";
import { Header, Empty } from "bonde-components";
import { Table, Filters } from "../../components";
import { deconstructAgent } from "../../services/utils";
import { useFilter } from "../../services/FilterProvider";
import columns from "./columns";
import { Groups, MatchesData } from "../../types";

const WrapEmpty = styled.div`
  height: 100%;
  & > div {
    height: 100%;
  }
`;

type Props = {
  community?: { id: number };
  groups: Groups;
  data: {
    FetchMatches: ({
      children,
    }: {
      children: (data: MatchesData) => React.ReactElement;
    }) => React.ReactElement | null;
    FilterOptions: {
      [x: string]: { label: string; value: string | number }[];
    };
  };
};

export default function Relations({
  data: { FetchMatches, FilterOptions },
  community,
  groups,
}: Props): React.ReactElement {
  const [state, dispatch] = useFilter();

  const save = async (values: any) => {
    // This needs to be done because when the text input is cleaned, it doesn't come as an `undefined` value, it's just not present and the previous state is maintained in the provider. Because of that, every time we dispatch the newValues, we need to clear them first.
    dispatch({ type: "relationships", value: values });
    return dispatch({ type: "page", value: 0 });
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
        {({
          relationships,
          relationshipsCount: {
            aggregate: { count },
          },
        }) => {
          const pagination = {
            totalPages: Math.round(count / state.rows),
            goToPage: (e: number) => dispatch({ type: "page", value: e }),
            setPageSize: (e: number) => dispatch({ type: "rows", value: e }),
            pageIndex: state.page,
            pageSize: state.rows,
          };

          return count < 1 ? (
            <WrapEmpty>
              <Empty message="Nada por aqui..." />
            </WrapEmpty>
          ) : groups.length < 2 ? (
            <WrapEmpty>
              <Empty message="Não existem grupos suficientes nessa comunidade." />
            </WrapEmpty>
          ) : (
            <>
              <Header.H4>Total ({count})</Header.H4>
              <Table
                data={
                  community?.id === 40
                    ? deconstructAgent(relationships)
                    : relationships
                }
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
