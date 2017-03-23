import { combineReducers } from 'redux'

import widgetsReducer from '~client/mobrender/redux/reducers/widgets'
import templates from '../templates/reducers'
import list from './list'

export default combineReducers({
  list,
  templates,
  widgets: widgetsReducer
})
