import { createAction } from './create-action'
import t from '../../../../../modules/widgets/__plugins__/match/action-types'

const asyncMatchCreate = params => (dispatch, getState, axios) => {
  const { auth: { credentials } } = getState()

  const endpoint = `/widgets/${params.widget_id}/match`
  const body = { match: params.match }
  const config = { headers: credentials }

  dispatch({ type: t.WIDGET_MATCH_CREATE_REQUEST })
  return axios.post(endpoint, body, config)
    .then(response => {
      // dispatch(createAction(t.WIDGET_MATCH_CREATE_SUCCESS, response.data))
      dispatch(createAction('ADD_MATCH', response.data))
      next()
      return Promise.resolve()
    })
    .catch(failure => {
      dispatch(createAction(t.WIDGET_MATCH_CREATE_FAILURE, failure))
      return Promise.reject({ _error: `Response ${failure}` })
    })
}

export default asyncMatchCreate
