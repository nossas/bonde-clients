import React from 'react'
import PropTypes from 'prop-types'
import { ToastContainer } from 'react-toastify'
import { createBrowserHistory } from 'history'
import { Router, Redirect, Switch, Route, useLocation } from 'react-router'
import { BondeSessionProvider, BondeSessionUI, useSession } from 'bonde-core-tools'
import { Loading } from 'bonde-components'
import { ProviderRedux } from 'services/redux'
// Routes
// import Dashboard from './scenes/Dashboard'
// import { Root as AuthRoot } from './scenes/Auth'
import HomePage from 'scenes/HomePage'
import ChatbotPage from 'scenes/ChatbotPage/page'
import CommunityPage from 'scenes/CommunityPage'
import SuperuserPage from 'scenes/SuperuserPage'
// import SettingsPage from './scenes/Dashboard/scenes/Settings'
// import TagsPage from './scenes/Dashboard/scenes/Tags'
// import InvitationsPage from './scenes/Dashboard/scenes/Invitations'
import { NotFound } from 'components'
// Styles
import 'react-toastify/dist/ReactToastify.css'

const SuperRoute = (props) => {
  const { user } = useSession()
  if (user.isAdmin) {
    return <Route {...props} />
  }
  return <h2>Permission Denied</h2>
}

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
        <SuperRoute path='/superuser' component={SuperuserPage} />
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

const Root = () => (
  <BondeSessionProvider
    fetchData
    environment={process.env.REACT_APP_ENVIRONMENT || 'development'}
    loading={TextLoading}
  >
    <ProviderRedux>
      <Router history={history}>
        <PagesRoute />
      </Router>
    </ProviderRedux>
  </BondeSessionProvider>
)

export default Root
