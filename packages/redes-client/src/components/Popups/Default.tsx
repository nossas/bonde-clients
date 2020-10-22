import React from "react";
import { Header, Text } from "bonde-components";
import styled from "styled-components";

const WrapButtons = styled.div`
  display: grid;
  grid-template-columns: auto auto;
  justify-content: space-between;
  align-items: center;
`;

const Wrap = styled.div`
  & > ${Header.H2} {
    margin: 0;
  }
`;

export default function Default({
  title,
  text,
  MainBtn,
  SecondaryBtn,
}: {
  title: string;
  text: string;
  MainBtn: React.ReactNode;
  SecondaryBtn: React.ReactNode;
}): React.ReactElement {
  return (
    <Wrap>
      <Header.H2>{title}</Header.H2>
      <Text>{text}</Text>
      <WrapButtons>
        {SecondaryBtn}
        {MainBtn}
      </WrapButtons>
    </Wrap>
  );
}
