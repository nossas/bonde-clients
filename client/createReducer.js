import { combineReducers } from 'redux'

// Redux Form
import { reducer as form } from 'redux-form'
import * as normalizers from '~client/utils/redux-form/normalizers'

// Reapop
import { reducer as notificationsReducer } from 'reapop'

// Application
import auth from '~client/account/redux/reducers'
import mobilizations from '~client/mobrender/redux/reducers'
import community from '~community/reducers'
import colorPicker from '~components/color-picker/reducers'
import subscriptions from '~client/subscriptions/redux/reducers'

const initialState = {
  host: '',
  protocol: ''
}

const sourceRequest = (state = initialState, action) => state

// Only combine reducers needed for initial render, others will be
// added async
export default function createReducer (asyncReducers) {
  return combineReducers({
    sourceRequest,
    form: form.normalize({
      subscriptionEditForm: {
        creditcard: normalizers.creditcard
      }
    }),
    notifications: notificationsReducer(),
    auth,
    mobilizations,
    community,
    colorPicker,
    subscriptions,
    ...asyncReducers
  })
}
