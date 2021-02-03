import React from 'react';
import styled from 'styled-components';
import { Header, Tab, Navigation } from 'bonde-components';
import { Container as GridContainer } from 'react-grid-system';
import Content from "../../components/Content";
import TabRoute from './TabRoute';


const SubHeader = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #000;
  padding: 0 60px;

  h3 {
    color: #fff;
    margin: 10px 0 30px;
  }

  ${Tab} {
    outline: none;
  }
`;

const PageWrap = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
`;

type Props = {
  title: string
  navigation: (args: NavigationArgs) => any
  children: any
}

export type NavigationArgs = {
  push: (path: string) => void
  is: (regex: any) => boolean
}

const Container = ({ children, title, navigation }: Props) => {
  return (
    <TabRoute>
      {({ push, is }) => (
        <PageWrap>
          <SubHeader>
            <Header.H3>{title}</Header.H3>
            <Navigation>
              {navigation({ push, is })}
            </Navigation>
          </SubHeader>
          <Content>
            <GridContainer fluid style={{ width: "100%", padding: "0" }}>
              {children}
            </GridContainer>
          </Content>
        </PageWrap>
      )}
    </TabRoute>
  );
}

export default Container;