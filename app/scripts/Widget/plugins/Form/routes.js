import React from 'react'
import { Route } from 'react-router'

import * as pages from './pages'

const FormRoutes = parentPath => [
  <Route path={`${parentPath}/fields`} component={pages.Fields} />,
  <Route path={`${parentPath}/form`} component={pages.Form} />
]

export default FormRoutes
