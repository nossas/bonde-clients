import React from 'react'
import { Route } from 'react-router'

import {
  MobilizationTemplatesCreatePage as CreatePage,
  MobilizationTemplatesListPage as ListPage,
  MobilizationTemplatesChoosePage as ChoosePage,
  MobilizationTemplatesChooseCustomListPage as ChooseCustomListPage,
} from './pages'

const path = '/templates'
const param = '/:template_id'
const defaultPath = `${path}${param}`

const MobilizationTemplatesRoutes = {
  user: parent => [
    <Route path={`/mobilizations/${path}/list`} component={ListPage} />
  ],
  newMobilization: parent => [
    <Route path={`/${parent}/${path}/choose`} component={ChoosePage} />,
    <Route path={`/${parent}/${path}/choose/custom/list`} component={ChooseCustomListPage} />
  ],
  dashboard: parent => [
    <Route path={`/${parent}/${path}/create`} component={CreatePage} />
  ]
}

export default MobilizationTemplatesRoutes
