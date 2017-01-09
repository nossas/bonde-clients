import * as t from '../action-types'
import { createAction } from './create-action'

const asyncFormEntryCreate = ({ mobilization, formEntry }) => (dispatch, getState, axios) => {
  const endpoint = `/mobilizations/${mobilization.id}/form_entries`
  const body = { form_entry: formEntry }

  return axios.post(endpoint, body)
    .then(response => {
      dispatch(createAction(t.ADD_FORM_ENTRY, response.data))
      return Promise.resolve()
    })
    .catch(failure => {
      return Promise.reject({ _error: `Response ${failure}` })
    })
}

export default asyncFormEntryCreate
