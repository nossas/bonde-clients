/* eslint-disable prefer-promise-reject-errors */
import downloadjs from 'downloadjs'
import { toast } from 'react-toastify';
//import { addNotification as notify, removeNotification as dismiss } from 'reapop'
import * as notifications from 'utils/notifications'

const asyncDownloadDonations = ({ id, name, ...community }) => (dispatch, getState, { api, intl }) => {
  const { auth: { credentials } } = getState()

  const filename = `[Relatório][Doação] ${name}.csv`
  // const notificationId = Math.random()
  const notifySuccess = () => {
    toast.success(notifications.reportDownloadSuccess(intl, { filename }).message, { 
      autoClose: 5000,
      hideProgressBar: true,
    })
    // TO DO: remove before migration notification to react-toastify
    // dispatch(toast(notifications.reportDownloadSuccess(intl, { filename })))
    // dispatch(toast(notificationId))
  }

  const notifyError = () => {
    toast.error(notifications.reportDownloadError(intl, { filename }).message, { 
      autoClose: 5000,
      hideProgressBar: true,
    })
    // TO DO: remove before migration notification to react-toastify
    // dispatch(toast(notifications.reportDownloadError(intl, { filename })))
    // dispatch(toast(notificationId))
  }

  // TO DO: remove before migration notification to react-toastify
  //const warningOptions = { filename, notificationId }
  // dispatch(toast(notifications.reportDownloadInProgressWarning(intl, warningOptions)))

  return api
    .get(`/communities/${id}/donation_reports.csv`, { headers: credentials })
    .then(({ status, data }) => {
      if (status === 400 && data.errors) {
        notifyError()
        return Promise.reject({ ...data.errors })
      } else if (status === 200) {
        if (data.length > 0) {
          notifySuccess()
          downloadjs(new Blob([data]), filename, 'text/csv')
          return Promise.resolve()
        }
      }
    })
    .catch(error => {
      notifyError()
      Promise.reject(error)
    })
}

export default asyncDownloadDonations
