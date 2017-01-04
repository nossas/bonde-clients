import { createAction } from './create-action'
import * as t from '../../../../../modules/widgets/__plugins__/match/action-types'
import { getWidget } from '../../../../../modules/widgets/selectors'


const asyncMatchDestroy = ({ props, where }) => (dispatch, getState, axios) => {
  const state = getState()
  const { auth: { credentials } } = state
  const widget = getWidget(state, props)

  const endpoint = `/widgets/${widget.id}/match/delete_where`
  const config = { headers: credentials, params: where }

  dispatch({ type: t.WIDGET_MATCH_DESTROY_REQUEST })
  return axios.delete(endpoint, config)
    .then(response => {
      dispatch(createAction(t.WIDGET_MATCH_DESTROY_SUCCESS, response.data))
      return Promise.resolve()
    })
    .catch(failure => {
      dispatch(createAction(t.WIDGET_MATCH_DESTROY_FAILURE, failure))
      return Promise.reject({ _error: `Response ${failure}` })
    })
}

export default asyncMatchDestroy
