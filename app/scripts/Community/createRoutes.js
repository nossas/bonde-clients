import React from 'react'
import { Route } from 'react-router'
import { BackgroundContainer, SidebarContainer } from '../Dashboard/containers'

import { EditCommunityContainer } from './containers'
import { AddCommunityPage, ListCommunityPage, EditInfoCommunityPage } from './pages'


export default requiredLogin => [
  <Route component={BackgroundContainer} onEnter={requiredLogin}>
    <Route path="/community" component={ListCommunityPage} />
    <Route path="/community/new" component={AddCommunityPage} />
  </Route>,
  <Route component={SidebarContainer} onEnter={requiredLogin}>
    <Route component={EditCommunityContainer}>
      <Route path="/community/info/edit" component={EditInfoCommunityPage} />
    </Route>
  </Route>
]
