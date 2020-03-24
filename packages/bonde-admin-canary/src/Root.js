import React from 'react'
import PropTypes from 'prop-types'
import { ToastContainer } from 'react-toastify'
import { createBrowserHistory } from 'history'
import { Router, Redirect, Switch, Route } from 'react-router-dom'
import { BondeSessionProvider, BondeSessionUI } from 'bonde-core-tools'
import { Loading } from 'bonde-components'
// import { ProviderRedux } from './services/redux'
// Routes
// import Dashboard from './scenes/Dashboard'
// import { Root as AuthRoot } from './scenes/Auth'
import HomePage from './scenes/Dashboard/scenes/Home'
// import SettingsPage from './scenes/Dashboard/scenes/Settings'
// import TagsPage from './scenes/Dashboard/scenes/Tags'
// import InvitationsPage from './scenes/Dashboard/scenes/Invitations'
import { NotFound } from './components'
// Styles
import 'react-toastify/dist/ReactToastify.css'

const TextLoading = ({ fetching }) => {
  const messages = {
    session: 'Carregando sessão...',
    user: 'Carregando usuário...',
    communities: 'Carregando communities...'
  }
  return <Loading fullsize message={messages[fetching]} />
}

TextLoading.propTypes = {
  fetching: PropTypes.string.isRequired
}

BondeSessionProvider.displayName = 'BondeSessionProvider'

const history = createBrowserHistory()

const config = {
  loginUrl: 'http://auth.bonde.devel:5000/auth/login',
  crossStorageUrl: 'http://cross-storage.bonde.devel',
  graphqlApiUrl: 'https://api-graphql.staging.bonde.org/v1/graphql'
}

const Root = () => (
  <BondeSessionProvider loading={TextLoading} config={config} fetchData>
    <ToastContainer
      className='BondeToastify'
      hideProgressBar={true}
    />
    <Router history={history}>
      <BondeSessionUI.Main>
        <BondeSessionUI.Content>
          <Switch>
            <Route path='/admin'>
              <HomePage />
            </Route>
            <Redirect exact from='/' to='/admin' />
            <Route>
              <NotFound />
            </Route>
          </Switch>
        </BondeSessionUI.Content>
      </BondeSessionUI.Main>
    </Router>
  </BondeSessionProvider>
)

export default Root
