import * as t from '../action-types'
import { createAction } from './create-action'

const asyncFormEntryCreate = ({ mobilization, formEntry }) => (dispatch, getState, axios) => {
  const endpoint = `/mobilizations/${mobilization.id}/form_entries`
  const body = { form_entry: formEntry }

  dispatch({ type: t.WIDGET_FORM_ENTRY_CREATE_REQUEST })
  return axios.post(endpoint, body)
    .then(response => {
      dispatch(createAction(t.WIDGET_FORM_ENTRY_CREATE_SUCCESS, response.data))
      return Promise.resolve()
    })
    .catch(failure => {
      dispatch(createAction(t.WIDGET_FORM_ENTRY_CREATE_FAILURE, failure))
      return Promise.reject({ _error: `Response ${failure}` })
    })
}

export default asyncFormEntryCreate
