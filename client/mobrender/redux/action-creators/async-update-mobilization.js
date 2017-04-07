import { createAction } from './create-action'
import * as t from '../action-types'

export default ({ id, template_mobilization_id, next, ...mobilization }) =>
  (dispatch, getState, { api }) => {
    const { auth: { credentials } } = getState()

    const endpoint = `/mobilizations/${id}`
    const body = { mobilization, template_mobilization_id }
    const config = { headers: credentials }

    dispatch({ type: t.UPDATE_MOBILIZATION_REQUEST })
    return api
      .put(endpoint, body, config)
      .then(({ status, data }) => {
        dispatch({ type: t.UPDATE_MOBILIZATION_SUCCESS, payload: data })
        next && next()
        return Promise.resolve()
      })
      .catch(failure => {
        dispatch(createAction(t.UPDATE_MOBILIZATION_FAILURE, failure))
        return Promise.reject({ error: `Response code ${failure}` })
      })
  }
