import * as t from './action-types'
import superagent from 'superagent'
import downloadjs from 'downloadjs'

export const select = id => dispatch => {
  return dispatch({ type: t.SELECT, id })
}

export const edit = ({ id, ...community }) => (dispatch, getState, request) => {
  const { auth: { credentials } } = getState()

  return request
    .put(`/communities/${id}`, { community }, { headers: credentials })
    .then(({ status, data }) => {
      if (status === 400 && data.errors) {
        return Promise.reject({ ...data.errors })
      } else if (status === 200) {
        dispatch({ type: t.EDIT, community: data })
        return Promise.resolve()
      }
    })
    .catch(error => Promise.reject(error))
}

export const downloadActivists = ({ id, name, ...community }) => (dispatch, getState, request) => {
  const { auth: { credentials } } = getState()

  return request
    .get(`/communities/${id}/activists.csv`, { headers: credentials })
    .then(({ status, data }) => {
      if (status === 400 && data.errors) {
        return Promise.reject({ ...data.errors })
      } else if (status === 200) {
        if (data.length > 0) {
          downloadjs(new Blob([data]), `relatorio-ativistas-${name}.csv`, 'text/csv')
          return Promise.resolve()
        }
      }
    })
    .catch(error => Promise.reject(error))
}

export const fetch = () => (dispatch, getState, { api }) => {
  const { auth: { credentials } } = getState()

  const endpoint = '/communities'
  const config = { headers: credentials }

  dispatch({ type: t.FETCH })
  return api
    .get(endpoint, config)
    .then(({ status, data }) => {
      if (status === 400 && data.errors) {
        dispatch({ type: t.FETCH_FAIL, error: data.errors })
        return Promise.reject({ ...data.errors })
      } else if (status === 200) {
        dispatch({ type: t.FETCH_SUCCESS, data })
        return Promise.resolve()
      }
    })
}

export const unset = dispatch => dispatch({ type: t.UNSET })
