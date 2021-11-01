import {
  ChakraProvider,
  chakraTheme, CSSReset, FontsLoader, Loading
} from 'bonde-components';
import { BondeSessionProvider as Session } from "bonde-core-tools";
import React from "react";
import { useTranslation } from "react-i18next";
import { BrowserRouter as Router, Redirect, Route } from "react-router-dom";
// Scenes and Components to make your application
import BaseLayout from './components/BaseLayout';
import SessionRedirect from './components/SessionRedirect';
import TextLoading from './components/TextLoading';
import ForgetPasswordPage from './scenes/ForgetPasswordPage';
import LoginPage from './scenes/LoginPage';
import RegisterPage from './scenes/RegisterPage';
import ResetPasswordPage from './scenes/ResetPasswordPage';

interface AppLoadingProperties {
  fetching: "communities" | "module" | "redirect" | "session" | "user"
}

const AppLoading = ({ fetching }: AppLoadingProperties): JSX.Element => {
  const { t } = useTranslation("loading");

  const messages = {
    session: t("session"),
    user: t("user"),
    communities: t("communities"),
    // TODO: change this implementation
    redirect: t("redirect"),
    module: t("module"),
  };

  return <Loading fullsize message={messages[fetching]} />;
};

type Environment = "development" | "production" | "staging";

function App(): JSX.Element {
  // Environment to use for configure bonde-core-tools
  const environmentConfig: Environment =
    (import.meta.env.PROD ? "production" : "development") as Environment;

  console.info('Build environment:', environmentConfig);
  // App URL
  const appUrl = import.meta.env.VITE_DOMAIN_ADMIN_CANARY ?? 'http://bonde.devel:5001';
  // Extra config
  const config: any = {
    // Stop redirect recursive accounts to accounts
    // TODO: complex logic
    accounts: "",
    // Setup local cross-storage and staging api
    crossStorage: import.meta.env.VITE_DOMAIN_CROSS_STORAGE ?? 'http://bonde.devel:5003',
    apiGraphql: import.meta.env.VITE_DOMAIN_API_GRAPHQL ?? 'http://api-graphql.bonde.devel/v1/graphql'
  };

  return (
    <React.Suspense fallback={Loading}>
      <>
        <FontsLoader />
        <ChakraProvider theme={chakraTheme}>
          <CSSReset />
          <Session environment={environmentConfig} loading={AppLoading} extraConfig={config}>
            <Router>
              <SessionRedirect loading={TextLoading} paths={['/auth/login']} to={appUrl}>
                <BaseLayout>
                  <Route exact path='/'>
                    <Redirect to='/login' />
                  </Route>
                  <Route exact path='/login'>
                    <LoginPage to={appUrl} />
                  </Route>
                  <Route exact path='/register'>
                    <RegisterPage to={appUrl} />
                  </Route>
                  <Route exact path='/forget-password'>
                    <ForgetPasswordPage />
                  </Route>
                  <Route exact path='/reset-password'>
                    <ResetPasswordPage />
                  </Route>
                </BaseLayout>
              </SessionRedirect>
            </Router>
          </Session>
        </ChakraProvider>
      </>
    </React.Suspense>
  );
}

export default App;
