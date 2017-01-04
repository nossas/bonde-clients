import { combineReducers } from 'redux'

import dataExport from './data-export'
import list from './list'


export default combineReducers({
  dataExport,
  list,
})
