import React from 'react'
import { AuthProvider, Route } from 'services/auth'
import { FullScreenLoadable } from 'components/Loadable'
import { Page as TagsPage } from './scenes/Tags'

const LoadableHomePage = FullScreenLoadable({
  loader: () => import('./scenes/Home/Page')
})

const Root = ({ match }) => (
  <AuthProvider>
    <Route
      exact
      path={match.url}
      component={LoadableHomePage}
    />
    
    <Route
      path={`${match.url}/tags`}
      component={TagsPage}
    />
  </AuthProvider>
)

export default Root
