import React from 'react'
import PropTypes from 'prop-types'
import { AuthProvider } from 'services/auth'
import { PageLayout, TutorialPageLayout } from 'services/router'
import { LoadingFullScreen } from 'components/Loadable'
import { CommunityPageLayout } from './components'
import HomePage from './scenes/Home'
import TagsPage from './scenes/Tags'

const DefaultPage = ({ community, title }) => (
  <h2>{`${title} | ${community.name}`}</h2>
)

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
        exact
        path={`${match.path}/:communityId`}
        component={DefaultPage}
        loading={LoadingFullScreen}
        pageProps={{ title: 'Dados' }}
        componentProps={{ title: 'Dados' }}
      />
      <CommunityPageLayout
        exact
        path={`${match.path}/:communityId/settings`}
        component={DefaultPage}
        loading={LoadingFullScreen}
        pageProps={{ title: 'Configurações' }}
        componentProps={{ title: 'Configurações' }}
      />
      <CommunityPageLayout
        exact
        path={`${match.path}/:communityId/chatbot`}
        component={DefaultPage}
        loading={LoadingFullScreen}
        pageProps={{ title: 'Chatbot' }}
        componentProps={{ title: 'Chatbot' }}
      />
    </AuthProvider>
  )
}

const { any, object, string } = PropTypes

DefaultPage.propTypes = {
  community: object,
  title: string
}

Dashboard.propTypes = {
  match: any
}

export default Dashboard
