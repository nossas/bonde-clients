<<<<<<< HEAD
import React, { useContext, useEffect } from 'react';
import { IntlProvider } from 'react-intl';
import { Provider, connect } from 'react-redux';
import {
  Provider as Session,
  Context as SessionContext,
} from 'bonde-core-tools';

import AppRouting from 'pages/app';

import * as t from 'community/action-types';

const Portal = ({ dispatch }) => {
  const { communities, community } = useContext(SessionContext);
  useEffect(() => {
    if ((communities || []).length > 0) {
      dispatch({ type: t.FETCH_SUCCESS, payload: communities });
    }
  }, [communities, dispatch]);

  useEffect(() => {
    if (!community) {
      const appDomain =
        process.env.REACT_APP_ENVIRONMENT === 'production'
          ? 'bonde.org'
          : process.env.REACT_APP_ENVIRONMENT === 'staging'
          ? 'staging.bonde.org'
          : 'bonde.devel';
      const protocol =
        process.env.REACT_APP_ENVIRONMENT !== 'development' ? 'https' : 'http';

      window.location.href = `${protocol}://admin-canary.${appDomain}`;
    }
  }, [community]);

  return <AppRouting />;
};

const ConnectedPortal = connect(undefined, (dispatch) => ({
  dispatch,
}))(Portal);

const App = ({ messages, locale, store }) => {
  // Environment to use for configure bonde-core-tools
  const envConfig = process.env.REACT_APP_ENVIRONMENT || 'development';
=======
import React, { useContext } from 'react';
// import { IntlProvider } from 'react-intl'
// import { Provider } from 'react-redux'
import { Provider as Session, Context as SessionContext } from 'bonde-core-tools';

// import AppRouting from 'pages/app';

const Routing = () => {
  const { currentUser: user } = useContext(SessionContext);

  return (
    <h3>Hello {user.firstName}</h3>
  );
}

const App = () => {
  // Environment to use for configure bonde-core-tools
  const envConfig =
    (process.env.REACT_APP_ENVIRONMENT || "development");
>>>>>>> feat(admin): add bonde-core-tools to render a simple admin app

  console.info('Build environment:', envConfig);

  return (
<<<<<<< HEAD
    <IntlProvider messages={messages} locale={locale}>
      <Provider store={store}>
        <Session
          uri={process.env.REACT_APP_DOMAIN_API_GRAPHQL}
          environment={envConfig}
          fetchData
        >
          <ConnectedPortal />
        </Session>
      </Provider>
    </IntlProvider>
  );
=======
    <Session
      uri={process.env.REACT_APP_DOMAIN_API_GRAPHQL}
      environment={envConfig}
      fetchData
    >
      <h2>Welcome to {envConfig}!</h2>
      <Routing />
    </Session>
  )
>>>>>>> feat(admin): add bonde-core-tools to render a simple admin app

  // return (
  //   <h2>Welcome to {envConfig}!</h2>
  // );
<<<<<<< HEAD
};

export default App;
=======
}

export default App;
>>>>>>> feat(admin): add bonde-core-tools to render a simple admin app
