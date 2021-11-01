/* eslint-disable prefer-promise-reject-errors */
import crossStorage from '../../cross-storage-client'
import * as t from "../action-types"

const asyncEdit = ({ id, ...community }) => (dispatch, getState, { api }) => {
  const { auth: { credentials } } = getState()

  // ensure that the document number value have only numbers
  if (community.recipient) {
    const { bank_account: bankAccount } = community.recipient
    const { document_number: documentNumber } = bankAccount
    community.recipient.bank_account = {
      ...bankAccount,
      document_number: String(documentNumber).replace(/\D/g, '')
    }
  }

  return api
    .put(`/communities/${id}`, { community }, { headers: credentials })
    .then(({ status, data }) => {
      if (status === 400 && data.errors) {
        return Promise.reject({ ...data.errors })
      } if (status === 200) {
        return crossStorage
          .onConnect()
          .then(async () => crossStorage
            .set('community', JSON.stringify(data))
            .then(async () => {
              dispatch({ type: t.EDIT, community: data })
              return Promise.resolve()
            }))
      }
    })
    .catch(async error_ => {
      if (error_.response && error_.response.data && error_.response.data.errors) {
        if (typeof error_.response.data.errors === 'object') {
          const error = Object.values(error_.response.data.errors)[0]
          return Promise.reject({ _error: error })
        }
        return Promise.reject({ _error: error_.response.data.errors })
      }
      return Promise.reject({ _errors: error_ })
    })
}

export default asyncEdit
