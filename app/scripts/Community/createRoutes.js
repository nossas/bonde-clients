import React from 'react'
import { Route } from 'react-router'

import { AddCommunityPage, ListCommunityPage } from './pages'


export default requireLogin => [
  <Route path="/community" component={ListCommunityPage} onEnter={requireLogin} />,
  <Route path="/community/new" component={AddCommunityPage} onEnter={requireLogin} />
]
