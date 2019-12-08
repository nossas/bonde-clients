import React from 'react'
import PropTypes from 'prop-types'
import { AuthProvider } from 'services/auth'
import { PageLayout, TutorialPageLayout } from 'services/router'
import { LoadingFullScreen } from 'components/Loadable'
import { FullPageLayout, ContentPage } from './components'
// scenes of app
import ChatbotPage from './scenes/Chatbot'
import HomePage from './scenes/Home'
import SettingsPage from './scenes/Settings'
import TagsPage from './scenes/Tags'
import InvitationsPage from './scenes/Invitations'

const defaultProps = (title, header) => ({
  title,
  wrapperHeaderComponent: header
})

const Dashboard = ({ match }) => {
  return (
    <AuthProvider loading={LoadingFullScreen}>
      <TutorialPageLayout
        exact
        path={match.path}
        component={ContentPage}
        pageProps={defaultProps('Inicio', HomePage.Header)}
        componentProps={{ render: HomePage }}
      />
      <PageLayout path={`${match.path}/tags`} component={TagsPage} />
      {/* Community Context */}
      <FullPageLayout
        path={`${match.path}/:communityId/invitations`}
        component={ContentPage}
        loading={LoadingFullScreen}
        pageProps={defaultProps('Mobilizadores convidados')}
        componentProps={{
          title: 'Voltar',
          backward: '/admin',
          render: InvitationsPage
        }}
      />
      {/* Configurações de Chatbot */}
      <FullPageLayout
        path={`${match.path}/:communityId/chatbot/:chatbotId`}
        component={ChatbotPage}
        loading={LoadingFullScreen}
        pageProps={defaultProps('Chatbot')}
        tabs={[
          { name: 'Fluxos de conversas' },
          { name: 'Menu Persistente', to: '/persistent-menu' },
          { name: 'Configurações', to: '/settings' }
        ]}
      />
      {/* Configurações de Comunidade */}
      <FullPageLayout
        path={`${match.path}/:communityId/settings`}
        component={SettingsPage}
        loading={LoadingFullScreen}
        pageProps={defaultProps('Configurações')}
        tabs={[
          { name: 'Informações' },
          { name: 'Mobilizadores', to: '/invite' },
          { name: 'Domínios', to: '/domain' },
          { name: 'Integrações', to: '/integration' },
          { name: 'Financeira', to: '/recipient' }
        ]}
      />
    </AuthProvider>
  )
}

const { any } = PropTypes

Dashboard.propTypes = {
  match: any
}

export default Dashboard
