import superagent from 'superagent'
import download from 'downloadjs'
import XLSX from 'xlsx'

export const EXPORT_DATACLIP_REQUEST = 'EXPORT_DATACLIP_REQUEST'
export const EXPORT_DATACLIP_SUCCESS = 'EXPORT_DATACLIP_SUCCESS'
export const EXPORT_DATACLIP_FAILURE = 'EXPORT_DATACLIP_FAILURE'
export const EXPORT_DATACLIP_FORCE_DOWNLOAD = 'EXPORT_DATACLIP_FORCE_DOWNLOAD'

export const exportDataClipByEndpoint = (endpoint, filename) => {
  return dispatch => {

    dispatch({ type: EXPORT_DATACLIP_REQUEST })

    superagent
      .get(endpoint)
      .end((err, res) => {
        if (err || !res.ok) {
          dispatch({ type: EXPORT_DATACLIP_FAILURE, error: err || res.body})
        } else {
          forceDownloadFile(makeExcelFile(res.body))
          dispatch({ type: EXPORT_DATACLIP_SUCCESS })
        }
      })
  }
}

export const forceDownloadFile = (workbookBase64) => {
  const workbookBuffer = new Buffer(workbookBase64, 'base64')
  download(workbookBuffer, filename, 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')
  dispatch({ type: EXPORT_DATACLIP_FORCE_DOWNLOAD })
}

export const makeExcelFile = (data, sheetName = 'Sheet 1') => {
  console.log(data)
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
