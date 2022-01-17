import React, { useContext } from 'react';
import { IntlProvider } from 'react-intl'
import { Provider } from 'react-redux'
import {
  Provider as Session,
  Context as SessionContext,
} from 'bonde-core-tools';

import AppRouting from 'pages/app';

const Portal = () => {
  const { currentUser: user } = useContext(SessionContext);
  console.log(`Hello ${user.firstName}`);

  return (
    <AppRouting />
  );
}

const App = ({ messages, locale, store }) => {
  // Environment to use for configure bonde-core-tools
  const envConfig =
    (process.env.REACT_APP_ENVIRONMENT || "development");

  console.info('Build environment:', envConfig);

  return (
    <IntlProvider messages={messages} locale={locale}>
      <Provider store={store}>
        <Session
          uri={process.env.REACT_APP_DOMAIN_API_GRAPHQL}
          environment={envConfig}
          fetchData
        >
          <Portal />
        </Session>
      </Provider>
    </IntlProvider>
  )

  // return (
  //   <h2>Welcome to {envConfig}!</h2>
  // );
}

export default App;