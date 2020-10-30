import "react-toastify/dist/ReactToastify.css";

import React from "react";
import { BrowserRouter as Router, Switch } from "react-router-dom";
import { BondeSessionProvider, BondeSessionUI } from "bonde-core-tools";
import { Loading, Main, Body } from "bonde-components";
import { ToastContainer } from "react-toastify";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import * as types from "styled-components/cssprop";
import styled from "styled-components/macro";

import { Relations, Individuals, Home, Match, Settings } from "./pages";
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

const BondeToastify = styled(ToastContainer)`
  & > .Toastify_toast {
    padding: 15px;
  }
  & > .Toastify__toast.Toastify__toast--success {
    background-color: #50e3c2;
  }
  & > .Toastify__toast .Toastify__toast-body {
    font-family: "Nunito Sans", sans-serif;
    font-weight: 600;
    font-size: 16px;
    color: white;
  }
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
                <BondeToastify>
                  <ToastContainer
                    position="top-right"
                    autoClose={5000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    draggable={false}
                    pauseOnHover
                  />
                </BondeToastify>
                <Body style={{ paddingTop: "20px", display: "unset" }}>
                  <Switch>
                    <SelectMapaOrRedes exact path="/" component={Home} />
                    <SelectMapaOrRedes path="/matches" component={Relations} />
                    <SelectMapaOrRedes
                      path="/pessoas"
                      component={Individuals}
                    />
                    <SelectMapaOrRedes path="/match" component={Match} />
                    <SelectMapaOrRedes
                      path="/configuracoes"
                      component={Settings}
                    />
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
