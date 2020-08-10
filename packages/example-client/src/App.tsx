import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { BondeSessionProvider } from "bonde-core-tools";
import { Loading } from "bonde-components";
// Scenes to router
import Home from './scenes/Home';

type SessionLoadingProps = {
  fetching: "session" | "user" | "communities" | "redirect" | "module"
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

  return (
    <BondeSessionProvider
      fetchData
      environment={environment as Environment}
      loading={SessionLoading}
    >
      <Router>
        <Route exact path="/" component={Home} />
      </Router>
    </BondeSessionProvider>
  );
}

export default () => (
  <React.Suspense fallback={Loading}>
    <App />
  </React.Suspense>
);
