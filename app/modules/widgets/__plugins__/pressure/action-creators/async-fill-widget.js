import * as t from '../action-types'
import { createAction } from './create-action'

//
// The name of this action needs to be refactored to make more sense.
// Besides to have to refact this action name, needs to refact
// API endpoint too.
//
const asyncFillWidget = (widgetId, fill) => (dispatch, getState, axios) => {
  // For endpoint reference, see: https://github.com/ourcities/hub-api/issues/39
  const endpoint = `/widgets/${widgetId}/fill`
  const body = { fill }

  dispatch({ type: t.WIDGET_PRESSURE_FILL_REQUEST })
  return axios.post(endpoint, body)
    .then(response => {
      const { widget_id: id, count } = response.data
      const payload = { counter: { id, count } }
      dispatch(createAction(t.WIDGET_PRESSURE_FILL_SUCCESS, payload))
      return Promise.resolve()
    })
    .catch(failure => {
      dispatch(createAction(t.WIDGET_PRESSURE_FILL_FAILURE, failure))
      return Promise.reject({ _error: `Response ${failure}` })
    })
}

export default asyncFillWidget
