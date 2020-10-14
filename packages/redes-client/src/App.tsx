import React from "react";
import { BrowserRouter as Router, Switch } from "react-router-dom";
import { BondeSessionProvider, BondeSessionUI } from "bonde-core-tools";
import { Loading, Main, Body as ComponentsBody } from "bonde-components";
import styled from "styled-components";

import { Relations, Individuals, Home, Match } from "./pages";
import { Header, SelectMapaOrRedes } from "./components";
import { FilterProvider } from "./services/FilterProvider";
import { CommunityExtraProvider } from "./services/CommunityExtraProvider";

type SessionLoadingProps = {
  fetching: "session" | "user" | "communities" | "redirect" | "module";
};

const SessionLoading = ({ fetching }: SessionLoadingProps) => {
  const messages = {
    session: "Carregando sessão...",
    user: "Carregando usuário...",
    communities: "Carregando communidades...",
    redirect: "Redirecionando para autenticação...",
    module: "Redirecionando para módulo...",
  };

  return <Loading fullsize message={messages[fetching]} />;
};

type Environment = "development" | "staging" | "production";

const Body = styled(ComponentsBody)`
  display: unset;
  padding: 20px 65px;
`;

const App = (): React.ReactElement => {
  console.log({ envs: process.env });
  const environment: string =
    process.env.REACT_APP_ENVIRONMENT || "development";
  const adminUrl =
    process.env.REACT_APP_DOMAIN_ADMIN_CANARY ||
    "http://admin-canary.bonde.devel:5001/admin";

  return (
    <BondeSessionProvider
      fetchData
      environment={environment as Environment}
      loading={SessionLoading}
    >
      <FilterProvider>
        <CommunityExtraProvider>
          <Router>
            <BondeSessionUI indexRoute={adminUrl}>
              <Main style={{ minWidth: "100%" }}>
                <Header />
                <Body>
                  <Switch>
                    <SelectMapaOrRedes exact path="/" component={Home} />
                    <SelectMapaOrRedes path="/matches" component={Relations} />
                    <SelectMapaOrRedes
                      path="/pessoas"
                      component={Individuals}
                    />
                    <SelectMapaOrRedes path="/match" component={Match} />
                  </Switch>
                </Body>
              </Main>
            </BondeSessionUI>
          </Router>
        </CommunityExtraProvider>
      </FilterProvider>
    </BondeSessionProvider>
  );
};

export default App;
