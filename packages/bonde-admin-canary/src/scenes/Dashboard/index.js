import React from 'react'
import PropTypes from 'prop-types'
import { AuthProvider } from 'services/auth'
import { PageLayout, TutorialPageLayout } from 'services/router'
import { LoadingFullScreen } from 'components/Loadable'
import { CommunityPageLayout } from './components'
import HomePage from './scenes/Home'
import TagsPage from './scenes/Tags'

const CommunityPage = ({ community }) => (
  <h2>{`Página de comunidade | ${community.name}`}</h2>
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
        path={`${match.path}/:communityId`}
        component={CommunityPage}
        loading={LoadingFullScreen}
      />
    </AuthProvider>
  )
}

Dashboard.propTypes = {
  match: PropTypes.any
}

export default Dashboard
