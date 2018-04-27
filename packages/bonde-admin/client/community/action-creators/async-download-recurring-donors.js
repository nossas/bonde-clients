/* eslint-disable prefer-promise-reject-errors */
import downloadjs from 'downloadjs'

const asyncDownloadRecurringDonors = ({ id, name }) => (dispatch, getState, { api }) => {
  const { auth: { credentials } } = getState()

  const endpoint = `/communities/${id}/download_subscriptions.csv`
  const body = {}
  const options = { headers: credentials }

  return api
    .post(endpoint, body, options)
    .then(({ status, data }) => {
      if (status === 400 && data.errors) {
        return Promise.reject({ ...data.errors })
      } else if (status === 200) {
        if (data.length > 0) {
          downloadjs(new Blob([data]), `[Relatório][DoadoresRecorrentes] ${name}.csv`, 'text/csv')
          return Promise.resolve()
        }
      }
    })
    .catch(error => Promise.reject(error))
}

export default asyncDownloadRecurringDonors
