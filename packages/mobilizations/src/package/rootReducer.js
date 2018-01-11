import { combineReducers } from 'redux'
import listable from './ducks/listable'
import {
  createNamedWrapperReducer as createReducer
} from './createReducer'

export default combineReducers({
  mobilizations: createReducer(listable, 'mobilizations'),
  blocks: createReducer(listable, 'blocks'),
  widgets: createReducer(listable, 'widgets')
})
