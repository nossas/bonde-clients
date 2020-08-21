import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { BondeSessionProvider, BondeSessionUI } from "bonde-core-tools";

import styled from "styled-components";
import { Loading, Text, Main, Body } from "bonde-components";

import { Relations } from "./pages";
import { Header, SelectMapaOrRedes } from "./components";
import logo from "./logo.svg";

const AppHeader = styled.header`
  background-color: #282c34;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: calc(10px + 2vmin);
  color: white;
`;

type SessionLoadingProps = {
  fetching: "session" | "user" | "communities" | "redirect" | "module";
};

const SessionLoading = ({ fetching }: SessionLoadingProps) => {
  const messages = {
    session: "Carregando sessão...",
    user: "Carregando usuário...",
    communities: "Carregando communities...",
    redirect: "Redirecionando para autenticação...",
    module: "Redirecionando para módulo...",
  };

  return <Loading fullsize message={messages[fetching]} />;
};

type Environment = "development" | "staging" | "production";

const App = (): React.ReactElement => {
  const environment: string =
    process.env.REACT_APP_ENVIRONMENT || "development";
  const adminUrl =
    process.env.REACT_APP_ADMIN_URL ||
    "http://admin-canary.bonde.devel:5001/admin";

  return (
    <BondeSessionProvider
      fetchData
      environment={environment as Environment}
      loading={SessionLoading}
    >
      <Router>
        <BondeSessionUI indexRoute={adminUrl}>
          <Main style={{ minWidth: "100%" }}>
            <Header />
            <Body>
              <Switch>
                <SelectMapaOrRedes path="/relations" component={Relations} />
                <Route exact path="/">
                  <div className="App">
                    <AppHeader>
                      <img src={logo} className="App-logo" alt="logo" />
                      <Text>
                        Edit <code>src/App.tsx</code> and save to reload.
                      </Text>
                      <a
                        className="App-link"
                        href="https://reactjs.org"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Learn React
                      </a>
                    </AppHeader>
                  </div>
                </Route>
              </Switch>
            </Body>
          </Main>
        </BondeSessionUI>
      </Router>
    </BondeSessionProvider>
  );
};

export default App;
