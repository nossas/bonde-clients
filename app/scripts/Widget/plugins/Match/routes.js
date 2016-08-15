import React from 'react'
import { Route } from 'react-router'

import * as pages from './pages'
import * as containers from './containers'

const path = '/matches'
const param = '/:match_id'
const defaultPath = `${path}${param}`

export const MatchShareContainerRoute = parentPath => (
  <Route path={`${parentPath}${defaultPath}/share`} component={containers.ShareContainer} />
)

const MatchWidgetRoutes = parentPath => [
  <Route path={`${parentPath}${path}/choices`} component={pages.ChoicesPage} />,
  <Route path={`${parentPath}${path}/goals`} component={pages.GoalsPage} />
]
export default MatchWidgetRoutes
