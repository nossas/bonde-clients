import React from "react";
import { Route, Switch, useHistory } from "react-router-dom";
import styled from "styled-components";
import { Empty, Header, Navigation, Tab, Row, Col } from "bonde-components";
import { useSession } from "bonde-core-tools";
import { useTranslation } from "react-i18next";
import Content from "../../components/Content";
// Subroutes
import HomeIndex from './HomeIndex';

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
  match: any;
  location: any;
};

const WidgetsActionsPage = ({ match, location }: Props) => {
  const history = useHistory();
  const { community } = useSession();
  const { t } = useTranslation("widget");

  // Utils
  // Test is active pathname
  const is = (regexPath: any): boolean =>
    new RegExp(regexPath).test(location.pathname);
  // Redirect to pathname
  const push = (path: string) => () => history.push(`${match.path}${path}`);

  return community ? (
    <PageWrap>
      <SubHeader>
        <Header.H3>{t("titles.home")}</Header.H3>
        <Navigation>
          <Tab active={is(/\/widgets\/*/)} onClick={push('/')}>
            {t("navigation.home")}
          </Tab>
        </Navigation>
      </SubHeader>
      <Content>
        <Row>
          <Col>
            <Switch>
              <Route exact path={`${match.path}`}>
                <HomeIndex community={community} />
              </Route>
            </Switch>
          </Col>
        </Row>
      </Content>
    </PageWrap>
  ) : (
    <Empty message="Nada por aqui..." />
  );
};

// TODO:
// - Translate

export default WidgetsActionsPage;
