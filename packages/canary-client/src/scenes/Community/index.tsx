import React from 'react'
import { Route, Switch, useHistory } from 'react-router-dom';
import styled from 'styled-components';
import { Empty, Header, Navigation, Tab, Row, Col } from 'bonde-components';
import { useSession } from 'bonde-core-tools';
import Content from '../../components/Content';

import Styles from './Styles';
import Mobilizers from './Mobilizers';
import Settings from './Settings';
import Integrations from './Integrations';
import Recipient from './Recipient';

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
  const history = useHistory();
  const { community } = useSession();

  // RegexWith parameters number
  // \/community\/\d+\/mobilizers\/*
  const isMobilizers = new RegExp(/\/community\/mobilizers\/*/).test(location.pathname);
  const isSettings = new RegExp(/\/community\/settings\/*/).test(location.pathname);
  const isIntegrations = new RegExp(/\/community\/integrations\/*/).test(location.pathname);
  const isRecipient = new RegExp(/\/community\/recipient\/*/).test(location.pathname);

  const push = (path: string) => {
    history.push(`${match.path}${path}`);
  }

  return community ? (
    <PageWrap>
      <SubHeader>
        <Header.h3>{community.name}</Header.h3>
        <Navigation>
          <Tab active={isSettings} onClick={() => push('/settings')}>Informações</Tab>
          <Tab active={isMobilizers} onClick={() => push('/mobilizers')}>Mobilizadores</Tab>
          <Tab active={isIntegrations} onClick={() => push('/integrations')}>Integrações</Tab>
          <Tab active={isRecipient} onClick={() => push('/recipient')}>Recebedor</Tab>
        </Navigation>
      </SubHeader>
      <Styles>
        <Content>
          <Row>
            <Col>
              <Switch>
                <Route exact path={`${match.path}/settings`}>
                  <Settings />
                </Route>
                <Route exact path={`${match.path}/mobilizers`}>
                  <Mobilizers community={community} />
                </Route>
                <Route exact path={`${match.path}/integrations`}>
                  <Integrations />
                </Route>
                <Route exact path={`${match.path}/recipient`}>
                  <Recipient />
                </Route>
              </Switch>
            </Col>
          </Row>
        </Content>
      </Styles>
    </PageWrap>
  ) : <Empty message='Nada por aqui...' />;
};

// TODO:
// - Translate

export default CommunityPage;
