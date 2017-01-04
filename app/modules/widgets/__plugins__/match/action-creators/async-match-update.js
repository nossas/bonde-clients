import { createAction } from './create-action'
import t from '../../../../../modules/widgets/__plugins__/match/action-types'


const asyncMatchUpdate = params => (dispatch, getState, axios) => {
  const { auth: { credentials } } = getState()

  const endpoint = `/widgets/${params.widget_id}/match/${params.match.id}`
  const body = { match: params.match }
  const config = { headers: credentials }

  dispatch({ type: t.WIDGET_MATCH_UPDATE_REQUEST })
  return axios.put(endpoint, body, config)
    .then(response => {
      dispatch(createAction(t.WIDGET_MATCH_UPDATE_SUCCESS, response.data))
      return Promise.resolve()
    })
    .catch(failure => {
      dispatch(createAction(t.WIDGET_MATCH_UPDATE_FAILURE, failure))
      return Promise.reject({ _error: `Response ${failure}` })
    })
}

export default asyncMatchUpdate
