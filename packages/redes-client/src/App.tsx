import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { BondeSessionProvider, BondeSessionUI } from "bonde-core-tools";

import styled from "styled-components";
import { Loading, Text } from "bonde-components";

import { Relations } from "./pages";
import { Header, FetchData } from "./components";
import logo from "./logo.svg";
import "./App.css";

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

const Content = styled.div`
  display: flex;
  flex-grow: 1;
  flex-direction: column;
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

function App() {
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
          <Content>
            <Header />
            <Switch>
              <FetchData path="/relations" component={Relations} />
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
          </Content>
        </BondeSessionUI>
      </Router>
    </BondeSessionProvider>
  );
}

export default App;
