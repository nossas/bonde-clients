import superagent from 'superagent'
import download from 'downloadjs'
import XLSX from 'xlsx'

export const EXPORT_DATACLIP_REQUEST = 'EXPORT_DATACLIP_REQUEST'
export const EXPORT_DATACLIP_SUCCESS = 'EXPORT_DATACLIP_SUCCESS'
export const EXPORT_DATACLIP_FAILURE = 'EXPORT_DATACLIP_FAILURE'
export const EXPORT_DATACLIP_FORCE_DOWNLOAD = 'EXPORT_DATACLIP_FORCE_DOWNLOAD'


export const exportDataClipByEndpoint = (options) => {
  return dispatch => {
    dispatch({ type: EXPORT_DATACLIP_REQUEST })

    superagent
      .get(`${process.env.API_URL}/mobilizations/${options.mobilization_id}/form_entries/?widget_id=${options.widget_id}`)
      .set(options.credentials)
      .end((err, res) => {
        if (err || !res.ok) {
          dispatch({ type: EXPORT_DATACLIP_FAILURE, error: err || res.body})
        } else {

          const data = res.body.length && res.body.map(entity => {
            const fields = JSON.parse(entity.fields)
            return fields.map(field => {
              const { label, value } = field
              return { label: label, value: value }
            })
          })

          const matriz = [
            data.length && data[0].map(entity => entity.label),
          ].concat(data.map(row => row.map(entity => entity.value)))

          forceDownloadFile(makeExcelFile(matriz), options.filename || 'export.xls')
          dispatch({ type: EXPORT_DATACLIP_SUCCESS })
        }
      })
  }
}

export const forceDownloadFile = (workbookBase64, filename) => {
  const workbookBuffer = new Buffer(workbookBase64, 'base64')
  const contentType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
  download(workbookBuffer, filename, contentType)

  return dispatch => { dispatch({ type: EXPORT_DATACLIP_FORCE_DOWNLOAD }) }
}

export const makeExcelFile = (data, sheetName = 'Sheet 1') => {
  let workbook = { Sheets: {}, Props: {}, SSF: {}, SheetNames: [] }
  let workbookSheet = {}
  let range = { s: {c:0, r:0}, e: {c:0, r:0} }

  for (let r = 0; r != data.length; ++r) {
    if (range.e.r < r) range.e.r = r

    for (let c = 0; c != data[r].length; ++c) {
      if (range.e.c < c) range.e.c = c

      const v = data[r][c]
      const isnum = typeof v === 'number'
      const isbool = typeof v === 'boolean'
      const t = isnum ? 'n' : (isbool ? 'b' : 's')
      const cell = { v, t }

      if (cell.v == null) continue

      const cell_ref = XLSX.utils.encode_cell({ c, r })
      workbookSheet[cell_ref] = cell
    }
  }
  workbookSheet['!ref'] = XLSX.utils.encode_range(range)

  workbook.SheetNames.push(sheetName)
  workbook.Sheets[sheetName] = workbookSheet

  const type = 'base64'
  return XLSX.write(workbook, { type })
}
