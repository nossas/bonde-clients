import React from "react";
import { Header } from "bonde-components";
import styled from "styled-components";
// import { useSession } from "bonde-core-tools";
import { Table, Filters } from "../../components";
import { useFilter } from "../../services/FilterProvider";
import columns from "./columns";

export const Wrap = styled.div`
  margin: 20px 0;
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
        groups: Array<{ is_volunteer: boolean; name: string }>;
        relationships_count: {
          aggregate: {
            count: number;
          };
        };
        agents: Array<{
          community_users: Array<{
            user: {
              first_name: string;
              last_name: string;
              id: number;
            };
          }>;
        }>;
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

  const save = async (values: any) =>
    dispatch({ type: "relationships", value: values });

  const reset = () =>
    dispatch({
      type: "relationships",
      value: {
        search: undefined,
        state: undefined,
        agent: undefined,
        status: undefined,
      },
    });

  return (
    <FetchMatches>
      {({
        groups,
        relationships,
        relationships_count: {
          aggregate: { count },
        },
        agents,
      }) => {
        const pagination = {
          totalPages: Math.round(count / state.rows),
          goToPage: (e: number) => dispatch({ type: "page", value: e }),
          setPageSize: (e: number) => dispatch({ type: "rows", value: e }),
          pageIndex: state.page,
          pageSize: state.rows,
        };

        return count < 1 ? (
          <Wrap>
            <Header.H4>
              Não existem conexões realizadas nessa comunidade.
            </Header.H4>
          </Wrap>
        ) : groups.length < 2 ? (
          <Wrap>
            <Header.H4>
              Não existem grupos suficientes nessa comunidade.
            </Header.H4>
          </Wrap>
        ) : (
          <Wrap>
            <Filters
              save={save}
              options={{
                ...FilterOptions,
                agents: agents[0].community_users.map(({ user }) => ({
                  label: `${user.first_name} ${user.last_name}`,
                  value: user.id,
                })),
              }}
              initialValues={state.relationships}
              reset={reset}
              search
              state
              agent
              relationshipStatus
            />
            <Header.H4>Total ({count})</Header.H4>
            <Table
              data={relationships}
              columns={columns(groups)}
              sticky="end"
              pagination={pagination}
            />
          </Wrap>
        );
      }}
    </FetchMatches>
  );
};
