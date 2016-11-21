import React from 'react'
import { Route } from 'react-router'

import * as pages from './pages'

const FormRoutes = parentPath => [
  <Route key="f-fields" path={`${parentPath}/fields`} component={pages.Fields} />,
  <Route key="f-form" path={`${parentPath}/form`} component={pages.Form} />
]

export default FormRoutes
