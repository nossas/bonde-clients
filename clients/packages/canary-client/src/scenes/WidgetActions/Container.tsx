import React from 'react';
import styled from 'styled-components';
import { Header, Navigation, Container as Content } from 'bonde-components';
import TabRoute from './TabRoute';


const SubHeader = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #000;
  padding: 0 60px;

  h3 {
    color: #fff;
    margin: 3px 0 6px;
  }
`;

const PageWrap = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
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

const Container: React.FC<Props> = ({ children, title, navigation }): React.ReactElement => {
  return (
    <TabRoute>
      {({ push, is }) => (
        <PageWrap className="page-wrap">
          <SubHeader>
            <Header.H3>{title}</Header.H3>
            <Navigation>
              {navigation({ push, is })}
            </Navigation>
          </SubHeader>
          <Content>
            {children}
          </Content>
        </PageWrap>
      )}
    </TabRoute>
  );
}

export default Container;
