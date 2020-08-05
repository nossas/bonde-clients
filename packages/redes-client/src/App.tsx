import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { BondeSessionProvider } from "bonde-core-tools";

import styled from "styled-components";
import { Loading, Text } from "bonde-components";

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

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
function App() {
  const environment: string =
    process.env.REACT_APP_ENVIRONMENT || "development";

  return (
    <BondeSessionProvider
      fetchData
      environment={environment as Environment}
      loading={SessionLoading}
    >
      <Router>
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
      </Router>
    </BondeSessionProvider>
  );
}

export default App;
