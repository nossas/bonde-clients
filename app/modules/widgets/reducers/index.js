import { combineReducers } from 'redux'

import dataExport from './data-export'
import list from './list'
import match from '../__plugins__/match/reducers'

export default combineReducers({
  dataExport,
  list,
  match
})
