import { combineReducers } from 'redux'
// Import used reducers
import { reducer as formReducer } from 'redux-form'
import { reducer as authReducer } from 'services/auth/redux'
import { reducer as tourReducer } from 'components/Tourtip'

export default combineReducers({
  // insert your reducers function
  auth: authReducer,
  form: formReducer,
  tour: tourReducer
})
