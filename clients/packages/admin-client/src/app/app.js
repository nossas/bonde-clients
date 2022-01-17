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

  console.info('Build environment:', envConfig);

  return (
    <Session
      uri={process.env.REACT_APP_DOMAIN_API_GRAPHQL}
      environment={envConfig}
      fetchData
    >
      <h2>Welcome to {envConfig}!</h2>
      <Routing />
    </Session>
  )

  // return (
  //   <h2>Welcome to {envConfig}!</h2>
  // );
}

export default App;