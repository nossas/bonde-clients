import { createAction } from './create-action'
import t from '../../../../../modules/widgets/__plugins__/match/action-types'
import WidgetsSelectors from '../../../../../modules/widgets/selectors'


const asyncMatchCreate = ({ match, props }) => (dispatch, getState, axios) => {
  const state = getState()
  const { auth: { credentials } } = state
  const widget = WidgetsSelectors.getWidget(state, props)

  const endpoint = `/widgets/${widget.id}/match`
  const body = { match }
  const config = { headers: credentials }

  dispatch({ type: t.WIDGET_MATCH_CREATE_REQUEST })
  return axios.post(endpoint, body, config)
    .then(response => {
      dispatch(createAction(t.WIDGET_MATCH_CREATE_SUCCESS, response.data))
      return Promise.resolve()
    })
    .catch(failure => {
      dispatch(createAction(t.WIDGET_MATCH_CREATE_FAILURE, failure))
      return Promise.reject({ _error: `Response ${failure}` })
    })
}

export default asyncMatchCreate
