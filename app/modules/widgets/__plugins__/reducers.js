import { combineReducers } from 'redux'

import match from './match/reducers'
import pressure from './pressure/reducers'

export default combineReducers({
  match,
  pressure
})
