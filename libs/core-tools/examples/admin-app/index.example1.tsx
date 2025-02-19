import 'react-app-polyfill/ie11';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Route, Switch } from "react-router";
import { Router } from "react-router-dom";
import { createBrowserHistory } from 'history';
import { BondeSessionProvider, BondeSessionUI, useSession } from '../.';

const history = createBrowserHistory();

const LoadingStyles = {
  display: 'flex',
  background: '#fff',
  width: '100%',
  height: '100vh',
}

const TextStyles = {
  color: '#000',
  textAlign: 'center',
  margin: 'auto'
}

const Loading = ({ fetching }) => {
  const messages = {
    session: 'Carregando sessão...',
    user: 'Carregando usuário...',
    communities: 'Carregando communities...'
  }
  return (
    <div style={LoadingStyles}>
      <h3 style={TextStyles}>{messages[fetching]}</h3>
    </div>
  )
}

const UserInfo = () => {
  const { community, user } = useSession();

  return (
    <ul>
      <li><b>User:</b> <span>{user.firstName}</span></li>
      {!!community && (
        <li><b>Community:</b> <span>{community.name}</span></li>
      )}
    </ul>
  );
};

const TestSubNavbar = () => (
  <div style={{ width: '100%', height: '50px', background: 'gray' }}>
    <h3 style={{ color: '#fff' }}>Subnav</h3>
  </div>
)

const config = {
  loginUrl: 'http://admin-canary.bonde.devel:5002/auth/login',
  profileUrl: 'http://admin-canary.bonde.devel:5002/admin/profile',
  crossStorageUrl: 'http://cross-storage.bonde.devel',
  graphqlApiUrl: 'https://api-graphql.staging.bonde.org/v1/graphql'
}

const App = () => {
  return (
    <BondeSessionProvider loading={Loading} config={config}>
      <Router history={history}>
        <BondeSessionUI.Main indexRoute='/'>
          <TestSubNavbar />
          <BondeSessionUI.Content>
            <Route path="/" component={UserInfo} />
          </BondeSessionUI.Content>
        </BondeSessionUI.Main>
      </Router>
    </BondeSessionProvider>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
