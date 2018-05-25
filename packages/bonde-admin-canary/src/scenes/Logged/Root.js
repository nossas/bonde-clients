import React from 'react'
import { AuthProvider, Route } from '../../services/auth'
import { Page as HomePage } from './scenes/Home'
import { Page as TagsPage } from './scenes/Tags'
import { FullPage } from '../../components/Header'

const Root = ({ match }) => (
  <AuthProvider>
    <FullPage>
      <Route exact path={match.url} component={HomePage} />
      <Route path={`${match.url}/tags`} component={TagsPage} />
    </FullPage>
  </AuthProvider>
)

export default Root
