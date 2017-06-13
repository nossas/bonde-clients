import { addNotification as notify } from 'reapop'
import { createAction } from '~client/utils/redux'
import * as t from '~client/community/action-types'
import * as AwaitActions from '~client/components/await/redux/action-creators'
import { genericRequestError, communityInviteSuccess } from '~client/utils/notifications'

export default (communityId, invitation) => (dispatch, getState, { api, intl }) => {
  const { auth: { credentials } } = getState()

  const endpoint = `/communities/${communityId}/invitation`
  const body = { invitation }
  const options = { headers: credentials }

  dispatch(AwaitActions.setLoading(true))
  dispatch(createAction(t.ASYNC_INVITE_REQUEST))

  return api
    .post(endpoint, body, options)
    .then(({ status, data }) => {
      dispatch(AwaitActions.setLoading(false))

      if (status === 400 && data.errors) {
        dispatch(notify(genericRequestError()))
        return Promise.reject({ ...data.errors })
      } else if (status === 200) {
        dispatch(notify(communityInviteSuccess(intl, invitation.email)))
        dispatch(createAction(t.ASYNC_INVITE_SUCCESS, data))
        return Promise.resolve()
      }
    })
    .catch(error => {
      dispatch(notify(genericRequestError()))
      dispatch(AwaitActions.setLoading(false))
      dispatch(createAction(t.ASYNC_INVITE_FAILURE, error))
      return Promise.reject(error)
    })
}
