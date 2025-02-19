import 'react-app-polyfill/ie11';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Redirect, Route, Switch } from "react-router";
import { Router, useLocation } from "react-router-dom";
import { createBrowserHistory } from 'history';
import { Loading, Header, Text } from 'bonde-components';
import { BondeSessionProvider, BondeSessionUI, useSession } from '../../.';
import LoginForm from './LoginForm'

const history = createBrowserHistory();

const TextLoading = ({ fetching }) => {
  const messages = { session: 'Carregando sessão...' }
  return <Loading fullsize message={messages[fetching]} />
}

const RegisterForm = () => (
  <h2>RegisterForm</h2>
);

const ModulePrivate = ({ onlyPublic }) => {
  const { isLogged } = useSession();
  const location = useLocation();

  if (isLogged && onlyPublic.filter(path => location.pathname).length > 0) {
    console.log('redirect to app :8181');
    window.location.href = 'http://app.bonde.devel:8181';
  }

  return (
    <Switch>
      <Route exact path='/'>
        <Redirect to='/auth/login' />
      </Route>
      <Route exact path='/auth/login'>
        <LoginForm />
      </Route>
      <Route exact path='/auth/register'>
        <RegisterForm />
      </Route>
    </Switch>
  )
}

ModulePrivate.defaultProps = {
  onlyPublic: []
}

const config = {
  crossStorageUrl: 'http://cross-storage.bonde.devel',
  graphqlApiUrl: 'https://api-graphql.staging.bonde.org/v1/graphql'
}

const App = () => {
  return (
    <BondeSessionProvider loading={TextLoading} config={config}>
      <Router history={history}>
        <ModulePrivate
          onlyPublic={['/auth/login']}
        />
      </Router>
    </BondeSessionProvider>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
