import React from "react";
import { Header } from "bonde-components";
import styled from "styled-components";
// import { useSession } from "bonde-core-tools";
import { Table } from "../../components";
import { useFilter } from "../../utils/FilterProvider";
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
        groups: { is_volunteer: boolean; name: string }[];
        relationships_count: {
          aggregate: {
            count: number;
          };
        };
      }) => React.ReactElement;
    }) => React.ReactElement | null;
  };
};

export default ({ data: { FetchMatches } }: Props): React.ReactElement => {
  const [state, dispatch] = useFilter();

  return (
    <FetchMatches>
      {({
        groups,
        relationships,
        relationships_count: {
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
