import * as t from '../../../modules/widgets/action-types'
import { forceDownloadFile, makeExcelFile } from '../../../modules/widgets/utils/data-export'
import { createAction } from '../../../modules/widgets/action-creators/create-action'


const asyncWidgetDataExport = params => (dispatch, getState, axios) => {
  const { auth: { credentials } } = getState()
  const { mobilization, widget, filename } = params

  const endpoint = `/mobilizations/${mobilization.id}/form_entries`
  const config = { headers: credentials, params }

  dispatch({ type: t.EXPORT_DATACLIP_REQUEST })
  return axios.get(endpoint, config)
    .then(response => {
      const data = response.data.length && response.data.map(({ fields }) => {
        return JSON.parse(fields).map(({ label, value }) => ({ label, value }))
      })
      const matrix = [
        data.length && data[0].map(entity => entity.label),
      ].concat(data.map(row => row.map(entity => entity.value)))

      forceDownloadFile(
        makeExcelFile(matrix),
        filename || 'export.xlsx'
      )
      dispatch(createAction(t.EXPORT_DATACLIP_SUCCESS, { widget }))
      return Promise.resolve()
    })
    .catch(failure => {
      dispatch(createAction(t.EXPORT_DATACLIP_FAILURE, failure))
      return Promise.reject({ _error: `Response ${failure}` })
    })
}

export default asyncWidgetDataExport
