import React from 'react'

import { r } from './../../../../util/short-aliases'
import { pages as FormWidgetPages } from './'

const FormRoutes = parent => [
  r(`${parent}/fields`, FormWidgetPages.Fields),
  r(`${parent}/form`, FormWidgetPages.Form)
]

export default FormRoutes
