import request from 'superagent'
import axios from 'axios'
import { history } from 'react-router'

import * as Paths from '../Paths'

// Constants

export const REQUEST_FETCH_MOBILIZATIONS = 'REQUEST_FETCH_MOBILIZATIONS'
export const SUCCESS_FETCH_MOBILIZATIONS = 'SUCCESS_FETCH_MOBILIZATIONS'
export const FAILURE_FETCH_MOBILIZATIONS = 'FAILURE_FETCH_MOBILIZATIONS'

export const SET_CURRENT_MOBILIZATION = 'SET_CURRENT_MOBILIZATION'
export const SUCCESS_ADD_MOBILIZATION = 'SUCCESS_ADD_MOBILIZATION'
export const SUCCESS_EDIT_MOBILIZATION = 'SUCCESS_EDIT_MOBILIZATION'

export const PROGRESS_UPLOAD_FACEBOOK_IMAGE = 'PROGRESS_UPLOAD_FACEBOOK_IMAGE'
export const FINISH_UPLOAD_FACEBOOK_IMAGE = 'FINISH_UPLOAD_FACEBOOK_IMAGE'

export const SET_MOUSE_OVER = 'SET_MOUSE_OVER'

const instance = axios.create({ baseURL: '/api/mobilizations' })

// Actions
// TODO: Buscar uma maneira mais clara de fazer isso

export const fetchMobilizations = (queryFilter = {}) => ({
  types: [
    REQUEST_FETCH_MOBILIZATIONS,
    SUCCESS_FETCH_MOBILIZATIONS,
    FAILURE_FETCH_MOBILIZATIONS
  ],
  promise: () => new Promise((resolve, reject) => {
    request
      .get(`${process.env.API_URL}/mobilizations`)
      .send(queryFilter)
      .end((err, res) => {
        if (err || !res.ok) reject(err || res.body)
        else resolve(res.body)
      })
  })
})

const addMobilizationSuccess = mobilization => ({ type: SUCCESS_ADD_MOBILIZATION, mobilization })
export const add = (credentials, mobilization, next) => dispatch =>
  new Promise((resolve, reject) => {
    request
      .post(`${process.env.API_URL}/mobilizations`)
      .set(credentials)
      .send({ mobilization })
      .end((err, res) => {
        if (err || !res.ok) reject({ _error: `Response Error: ${err.status}` })
        else {
          dispatch(addMobilizationSuccess(res.body))
          // TODO: I don't know if the better place.
          next && next(res.body)
          resolve()
        }
      })
  })

export const setCurrentMobilizationId = currentId => ({ type: SET_CURRENT_MOBILIZATION, currentId })

const editSuccess = mobilization => ({ type: SUCCESS_EDIT_MOBILIZATION, mobilization })
const editRequest = (mobilization, headers) =>
  instance.put(`/${mobilization.id}`, { mobilization }, { headers })

export const edit = (credentials, mobilization, next) => (dispatch, getState) =>
  editRequest(mobilization, credentials)
    .then(response => {
      console.log(getState());
      const { data: updatedMobilization } = response
      dispatch(editSuccess(updatedMobilization))
      next && next(updatedMobilization)
    })
    .catch(error => {
      if (error.response && error.response.status === 401) {
        const { response: { status, data: { errors } } } = error
        if (status === 401) return Promise.reject({ _error: errors.join('') })
      }
      return Promise.reject({ _error: error })
    })

export const mobilizationsIsLoaded = state => state.mobilization.loaded
export const progressUploadFacebookImage = () => ({ type: PROGRESS_UPLOAD_FACEBOOK_IMAGE })
export const finishUploadFacebookImage = () => ({ type: FINISH_UPLOAD_FACEBOOK_IMAGE })

export const setMouseOver = status => ({ type: SET_MOUSE_OVER, status })
