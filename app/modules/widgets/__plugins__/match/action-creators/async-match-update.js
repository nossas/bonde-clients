import { createAction } from './create-action'
import * as t from '../../../../../modules/widgets/__plugins__/match/action-types'
import { getWidget } from '../../../../../modules/widgets/selectors'


const asyncMatchUpdate = ({ match, props }) => (dispatch, getState, axios) => {
  const state = getState()
  const { auth: { credentials } } = state
  const widget = getWidget(state, props)

  const endpoint = `/widgets/${widget.id}/match/${match.id}`
  const body = { match }
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
