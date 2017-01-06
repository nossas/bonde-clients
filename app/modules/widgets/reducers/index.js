import { combineReducers } from 'redux'

import dataExport from './data-export'
import list from './list'
import { reducers as match } from '../__plugins__/match'

export default combineReducers({
  dataExport,
  list,
  match
})
