import React from 'react'
import { Route } from 'react-router'
import { BackgroundContainer } from '../Dashboard/containers'

import { AddCommunityPage, ListCommunityPage } from './pages'


export default requiredLogin => (
  <Route component={BackgroundContainer} onEnter={requiredLogin}>
    <Route path="/community" component={ListCommunityPage} />,
    <Route path="/community/new" component={AddCommunityPage} />
  </Route>
)
