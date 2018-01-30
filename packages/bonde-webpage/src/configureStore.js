import { createStore, combineReducers, applyMiddleware } from 'redux'
import logger from 'redux-logger'
import mobilizationsReducer from './package/rootReducer'

const rootReducer = combineReducers({
  mobilizations: mobilizationsReducer
})

export default (initialState = {}) => {
  return createStore(
    rootReducer,
    initialState,
    applyMiddleware(logger)
  )
}
