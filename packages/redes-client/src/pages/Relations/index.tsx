import React from "react";
import { Header } from "bonde-components";
import styled from "styled-components";
// import { useSession } from "bonde-core-tools";
import { Table } from "../../components";
import columns from "./columns";

export const Wrap = styled.div`
  margin: 20px 0;
`;

type Props = {
  data: {
    FetchMatches: ({
      children,
    }: {
      children: (data: {
        relations: Array<any>;
        groups: { is_volunteer: boolean; name: string }[];
      }) => React.ReactElement;
    }) => React.ReactElement | null;
  };
};

export default ({ data: { FetchMatches } }: Props): React.ReactElement => {
  // const { community } = useSession();
  return (
    <FetchMatches>
      {(data) => {
        return data.relations.length < 1 ? (
          <Wrap>
            <Header.H4>
              Não existem conexões realizadas nessa comunidade.
            </Header.H4>
          </Wrap>
        ) : data.groups.length < 2 ? (
          <Wrap>
            <Header.H4>
              Não existem grupos suficientes nessa comunidade.
            </Header.H4>
          </Wrap>
        ) : (
          <Wrap>
            <Header.H4>Total ({data.relations.length})</Header.H4>
            <Table
              data={data.relations}
              columns={columns(data.groups)}
              sticky="end"
            />
          </Wrap>
        );
      }}
    </FetchMatches>
  );
};
