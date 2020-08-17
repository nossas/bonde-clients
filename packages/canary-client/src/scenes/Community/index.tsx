import React from 'react'
import { Route, Switch, Redirect } from 'react-router-dom';
import styled from 'styled-components';
import { Empty, Header, Navigation, Tab, Row, Col } from 'bonde-components';
import { useSession } from 'bonde-core-tools';
import Content from '../../components/Content';
import Mobilizers from './Mobilizers';

const SubHeader = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #000;
  padding: 0 60px;

  h3 {
    color: #fff;
    margin: 10px 0 30px;
  }
`;

const PageWrap = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
`;

type Props = {
  match: any
  location: any
}

const CommunityPage = ({ match, location }: Props) => {
  const { community } = useSession();

  // RegexWith parameters number
  // \/community\/\d+\/mobilizers\/*
  const isActive = new RegExp(/\/community\/mobilizers\/*/).test(location.pathname);

  return community ? (
    <PageWrap>
      <SubHeader>
        <Header.h3>{community.name}</Header.h3>
        <Navigation>
          <Tab active={isActive}>Mobilizadores</Tab>
          <Tab
            onClick={() => {
              if (process.env.REACT_APP_DOMAIN_ADMIN) {
                window.location.href = new URL('/community/info', process.env.REACT_APP_DOMAIN_ADMIN).href
              }
            }}
          >
            Outras configurações
          </Tab>
        </Navigation>
      </SubHeader>
      <Content>
        <Row>
          <Col>
            <Switch>
              <Route exact path={`${match.path}/mobilizers`}>
                <Mobilizers community={community} />
              </Route>
              <Redirect from={match.path} to={`${match.path}/mobilizers`} />
            </Switch>
          </Col>
        </Row>
      </Content>
    </PageWrap>
  ) : <Empty message='Nada por aqui...' />;
};

export default CommunityPage;
