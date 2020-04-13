import React from 'react'
import PropTypes from 'prop-types'
import { ToastContainer } from 'react-toastify'
import { createBrowserHistory } from 'history'
import { Router, Redirect, Switch, Route, useLocation } from 'react-router'
import { BondeSessionProvider, BondeSessionUI } from 'bonde-core-tools'
import { Loading } from 'bonde-components'
// import { ProviderRedux } from './services/redux'
// Routes
// import Dashboard from './scenes/Dashboard'
// import { Root as AuthRoot } from './scenes/Auth'
import HomePage from 'scenes/HomePage'
import ChatbotPage from 'scenes/ChatbotPage'
import CommunityPage from 'scenes/CommunityPage'
// import SettingsPage from './scenes/Dashboard/scenes/Settings'
// import TagsPage from './scenes/Dashboard/scenes/Tags'
// import InvitationsPage from './scenes/Dashboard/scenes/Invitations'
import { NotFound } from 'components'
// Styles
import 'react-toastify/dist/ReactToastify.css'

const PagesRoute = () => {
  const location = useLocation()

  return (
    <BondeSessionUI
      indexRoute='/'
      disableNavigation={location.pathname === '/'}
    >
      <ToastContainer
        className='BondeToastify'
        hideProgressBar={true}
      />
      <Switch>
        <Route exact path='/' component={HomePage} />
        <Route path='/chatbot' component={ChatbotPage} />
        <Route path='/community' component={CommunityPage} />
        <Redirect from='/admin' to='/' />
        <Route component={NotFound} />
      </Switch>
    </BondeSessionUI>
  )
}

const TextLoading = ({ fetching }) => {
  const messages = {
    session: 'Carregando sessão...',
    user: 'Carregando usuário...',
    communities: 'Carregando communities...',
    redirect: 'Redirecionando para autenticação...',
    module: 'Redirecionando para módulo...'
  }
  return <Loading fullsize message={messages[fetching]} />
}

TextLoading.propTypes = {
  fetching: PropTypes.string.isRequired
}

BondeSessionProvider.displayName = 'BondeSessionProvider'

const history = createBrowserHistory()

const extraConfig = {
  chatbot: 'http://admin-canary.bonde.devel:5001/chatbot'
}

const Root = () => (
  <BondeSessionProvider
    fetchData
    environment={process.env.REACT_APP_ENVIRONMENT || 'development'}
    loading={TextLoading}
    extraConfig={extraConfig}
  >
    <Router history={history}>
      <PagesRoute />
    </Router>
  </BondeSessionProvider>
)

export default Root
