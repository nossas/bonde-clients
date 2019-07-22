import { toast } from 'react-toastify'
// TO DO: remove before migration notification to react-toastify
// import { addNotification as notify } from 'reapop'
import * as notifications from 'utils/notifications'
import * as t from 'subscriptions/redux/action-types'
import { createAction } from 'utils/redux'
import * as AwaitActions from 'components/await/redux/action-creators'

//
// Action to cancel a subscription.
//
// @param Object({
//   id: Integer|String (required)
//   token: String (required)
// })
//
export default ({ id, token }) => (dispatch, getState, { api, intl }) => {
  const endpoint = `/subscriptions/${id}`
  const config = { params: { token } }

  dispatch(AwaitActions.setLoading(true))
  return api
    .delete(endpoint, config)
    .then(({ data }) => {
      dispatch(AwaitActions.setLoading(false))
      dispatch(createAction(t.ASYNC_FETCH_SUCCESS, data))
      toast.sucess(notifications.subscriptionCancelSuccess(intl).message, { 
        autoClose: 5000,
        hideProgressBar: true,
      })
      // TO DO: remove before migration notification to react-toastify
      // dispatch(notify(notifications.subscriptionCancelSuccess(intl)))
    })
    .catch(e => {
      dispatch(AwaitActions.setLoading(false))
      dispatch(createAction(t.ASYNC_FETCH_FAILURE, e))
      // TO DO: remove before migration notification to react-toastify
      // dispatch(notify(notifications.genericRequestError(intl)))
      toast.error(notifications.genericRequestError(intl).message, { 
        autoClose: 5000,
        hideProgressBar: true,
      })
      return Promise.reject(e)
    })
}
