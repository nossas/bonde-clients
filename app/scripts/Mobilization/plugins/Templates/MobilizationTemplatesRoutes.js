import React from 'react'
import { Route } from 'react-router'

import {
  MobilizationTemplatesCreatePage,
  MobilizationTemplatesListPage,
  MobilizationTemplatesChoosePage
} from './pages'

const path = '/templates'
const param = '/:template_id'
const defaultPath = `${path}${param}`

const MobilizationTemplatesRoutes = {
  user: parent => [
    <Route path={`/mobilizations/${path}/list`} component={MobilizationTemplatesListPage} />
  ],
  newMobilization: parent => [
    <Route path={`/${parent}/${path}/choose`} component={MobilizationTemplatesChoosePage} />
  ],
  dashboard: parent => [
    <Route path={`/${parent}/${path}/create`} component={MobilizationTemplatesCreatePage} />
  ]
}

export default MobilizationTemplatesRoutes
