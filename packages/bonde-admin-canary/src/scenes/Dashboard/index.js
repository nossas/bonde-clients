import React from 'react'
import PropTypes from 'prop-types'
import { AuthProvider } from 'services/auth'
import { PageLayout, TutorialPageLayout } from 'services/router'
import { LoadingFullScreen } from 'components/Loadable'
import { CommunityPageLayout } from './components'
import HomePage from './scenes/Home'
import TagsPage from './scenes/Tags'
import SettingsPage from './scenes/Settings'
import ChatbotPage from './scenes/Chatbot'
import AnalyticsPage from './scenes/Analytics'


const Dashboard = ({ match }) => {
  return (
    <AuthProvider loading={LoadingFullScreen}>
      <TutorialPageLayout
        exact
        path={match.path}
        component={HomePage}
        pageProps={{
          title: 'Inicio',
          wrapperHeaderComponent: HomePage.Header
        }}
      />
      <PageLayout path={`${match.path}/tags`} component={TagsPage} />
      {/* Community Context */}
      <CommunityPageLayout
        path={`${match.path}/:communityId/analytics`}
        component={AnalyticsPage}
        loading={LoadingFullScreen}
        pageProps={{ title: 'Dados' }}
        tabs={[
          { path: /^\/admin\/\d+\/analytics$/, name: 'Dashboard' },
          { path: /^\/admin\/\d+\/analytics\/activists$/, name: 'Ativistas', to: '/activists' },
          { path: /^\/admin\/\d+\/analytics\/report$/, name: 'Relatórios', to: '/report' },
        ]}
      />
      {/* Configurações de Chatbot */}
      <CommunityPageLayout
        path={`${match.path}/:communityId/chatbot`}
        component={ChatbotPage}
        loading={LoadingFullScreen}
        pageProps={{ title: 'Chatbot' }}
        tabs={[
          { path: /^\/admin\/\d+\/chatbot$/, name: 'Fluxos de conversas' },
          { path: /^\/admin\/\d+\/chatbot\/settings$/, name: 'Configurações', to: '/settings' },
        ]}
      />
      {/* Configurações de Comunidade */}
      <CommunityPageLayout
        path={`${match.path}/:communityId/settings`}
        component={SettingsPage}
        loading={LoadingFullScreen}
        pageProps={{ title: 'Configurações' }}
        tabs={[
          { path: /^\/admin\/\d+\/settings$/, name: 'Informações', to: '' },
          { path: /^\/admin\/\d+\/settings\/invite$/, name: 'Mobilizadores', to: '/invite' },
          { path: /^\/admin\/\d+\/settings\/domain$/, name: 'Domínios', to: '/domain' },
          { path: /^\/admin\/\d+\/settings\/integration$/, name: 'Integrações', to: '/integration' },
          { path: /^\/admin\/\d+\/settings\/recipient$/, name: 'Financeira', to: '/recipient' },
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
