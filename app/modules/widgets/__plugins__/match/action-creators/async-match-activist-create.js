import * as t from '../action-types'
import { createAction } from './create-action'

const asyncMatchActivistCreate = ({ matchId, activist }) => (dispatch, getState, axios) => {
  const { auth: { credentials } } = getState()

  const endpoint = '/activist_matches'
  const body = { activist_match: { match_id: matchId, activist } }
  const config = { headers: credentials }

  dispatch({ type: t.REQUEST_ADD_ACTIVIST_MATCH })
  return axios.post(endpoint, body, config)
    .then(response => {
      dispatch(createAction(t.SUCCESS_ADD_ACTIVIST_MATCH, response.data))
      return Promise.resolve()
    })
    .catch(failure => {
      dispatch(createAction(t.FAILURE_ADD_ACTIVIST_MATCH, failure))
      return Promise.reject({ _error: `Response ${failure}` })
    })
}

export default asyncMatchActivistCreate
