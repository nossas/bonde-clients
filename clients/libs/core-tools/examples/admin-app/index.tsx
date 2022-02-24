import 'react-app-polyfill/ie11';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Redirect, Route, Switch, useLocation } from "react-router";
import { Router } from "react-router-dom";
import { createBrowserHistory } from 'history';
import { Loading } from 'bonde-components';
import { BondeSessionProvider, BondeSessionUI } from '../../.';
import HomePage from './HomePage';

const history = createBrowserHistory();

const TextLoading = ({ fetching }) => {
  const messages = {
    session: 'Carregando sessão...',
    user: 'Carregando usuário...',
    communities: 'Carregando communities...',
    redirect: 'Redirecionando para login...',
    module: 'Redirecionando para módulo...'
  }
  return <Loading fullsize message={messages[fetching]} />
}

const PagesRoute = () => {
  const location = useLocation()

  return (
    <BondeSessionUI
      indexRoute='/'
      disableNavigation={location.pathname === '/'}
    >
      <Switch>
        <Route exact path='/'>
          <HomePage />
        </Route>
      </Switch>
    </BondeSessionUI>
  )
}

const extraConfig = {
  settings: 'http://admin-canary.bonde.devel:5001/settings',
  apiGraphql: 'https://api-graphql.staging.bonde.org/v1/graphql'
}

const App = () => {
  return (
    <BondeSessionProvider
      fetchData
      extraConfig={extraConfig}
      loading={TextLoading}
    >
      <Router history={history}>
        <PagesRoute />
      </Router>
    </BondeSessionProvider>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
