import * as MobilizationSelectors from '../../../scripts/Mobilization/MobilizationSelectors'
import * as t from '../action-types'
import { createAction } from './create-action'


const asyncWidgetUpdate = widget => (dispatch, getState, axios) => {
  const state = getState()
  const mobilization = MobilizationSelectors.getMobilization(state)
  const { auth: { credentials } } = state

  const endpoint = `/mobilizations/${mobilization.id}/widgets/${widget.id}`
  const body = { widget }
  const config = { headers: credentials }

  dispatch({ type: t.REQUEST_WIDGET_UPDATE })
  return axios.put(endpoint, body, config)
    .then(response => {
      dispatch(createAction(t.SUCCESS_WIDGET_UPDATE, response.data))
      return Promise.resolve()
    })
    .catch(error => {
      dispatch(createAction(t.FAILURE_WIDGET_UPDATE, error))
      Promise.reject({ _error: `Response ${error}` })
    })
}

export default asyncWidgetUpdate
