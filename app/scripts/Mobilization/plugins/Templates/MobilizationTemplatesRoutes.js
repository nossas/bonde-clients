import React from 'react'
import { Route } from 'react-router'

import {
  MobilizationTemplatesCreatePage
} from './pages'

const path = '/templates'
const param = '/:template_id'
const defaultPath = `${path}${param}`

const MobilizationTemplatesRoutes = parent => [
  <Route path={`/${parent}/${path}/create`} component={MobilizationTemplatesCreatePage} />
]

export default MobilizationTemplatesRoutes
