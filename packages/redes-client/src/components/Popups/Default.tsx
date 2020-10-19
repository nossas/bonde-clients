import React from "react";
import { Header, Text } from "bonde-components";
import styled from "styled-components";

const WrapButtons = styled.div`
  display: grid;
  grid-template-columns: auto auto;
  grid-column-gap: 100px;
  justify-content: space-between;
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
    <>
      <Header.H2>{title}</Header.H2>
      <Text>{text}</Text>
      <WrapButtons>
        {SecondaryBtn}
        {MainBtn}
      </WrapButtons>
    </>
  );
}
