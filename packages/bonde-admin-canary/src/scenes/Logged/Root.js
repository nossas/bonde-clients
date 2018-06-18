import React from 'react'
import { AuthProvider, Route } from 'services/auth'
import { FullScreenLoadable, LoadingFullScreen } from 'components/Loadable'
import TagsPage from './scenes/Tags'

const HomePage = FullScreenLoadable({
  loader: () => import('./scenes/Home')
})

const Root = ({ match }) => (
  <AuthProvider loading={LoadingFullScreen}>
    <Route
      exact
      path={match.url}
      component={HomePage}
    />

    <Route
      path={`${match.url}/tags`}
      component={TagsPage}
    />
  </AuthProvider>
)

export default Root
