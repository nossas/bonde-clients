import superagent from 'superagent'
import download from 'downloadjs'
import XLSX from 'xlsx'

export const XLSX_CONTENT_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'

export const downloadFormEntries = () => {
  const filename = 'form-export.xlsx'
  const sheetName = 'Mobilizations Workbook Name'

  return () => {
    superagent.get(`${process.env.API_URL}/mobilizations`)
    .end((err, res) => {
      if (err) return console.log(res.body || err)

      const data = res.body.map(mobilization => Object.values(mobilization))
      const workbookBase64 = makeExcelFile(sheetName, data)
      const workbookBuffer = new Buffer(workbookBase64, 'base64')
      download(workbookBuffer, filename, XLSX_CONTENT_TYPE)
    })
  }
}

export const makeExcelFile = (sheetName, data) => {
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
  return (workbook, { type })
}
