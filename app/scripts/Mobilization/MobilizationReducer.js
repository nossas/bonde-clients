import { combineReducers } from 'redux'
import { createFormReducer } from 'redux-form'

import * as MobilizationReducer from './reducers'



// TODO: Check if it is a good idea
export default combineReducers({
  ...MobilizationReducer,
  forms: {
    basics: createFormReducer('basics', ['name', 'goal']),
  }
})
