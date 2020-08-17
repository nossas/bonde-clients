import React from "react";
import { Header, Table } from "bonde-components";
import styled from "styled-components";

import columns from "./columns";

export const Wrap = styled.div`
  ${Header.H4} {
    margin: 0 0 15px;
  }
`;

type Props = {
  data: {
    FetchMatches: ({
      children,
    }: {
      children: (data: any) => React.ReactElement;
    }) => React.ReactElement | null;
  };
};

export default ({ data: { FetchMatches } }: Props) => {
  return (
    <FetchMatches>
      {(data: any) => {
        return data.length === 0 ? (
          <Wrap>
            <Header.H4>
              Não existem conexões realizadas nessa comunidade.
            </Header.H4>
          </Wrap>
        ) : (
          <Wrap>
            <Header.H4>Relações ({data.length})</Header.H4>
            <Table data={data} columns={columns} />
          </Wrap>
        );
      }}
    </FetchMatches>
  );
};
