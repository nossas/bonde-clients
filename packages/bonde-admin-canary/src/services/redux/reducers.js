import { combineReducers } from 'redux'
// Import used reducers
import { reducer as formReducer } from 'redux-form'
import { reducer as authReducer } from 'services/auth/redux'
import { reducer as querysetReducer } from 'components/Queryset'
import { paginationReducer } from 'components'

export default combineReducers({
  // insert your reducers function
  auth: authReducer,
  form: formReducer,
  queryset: querysetReducer,
  pagination: paginationReducer
})
