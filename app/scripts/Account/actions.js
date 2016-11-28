import axios from 'axios'

import {
  AUTH_LOGOUT_REQUEST,
  AUTH_LOGOUT_SUCCESS,
  AUTH_LOGOUT_FAILURE
} from '../constants/ActionTypes'

// redux-form action
export const register = user => (dispatch, getState, request) => {
  return request
    .post('/users', { user })
    .then(({ status, data }) => {
      if (status === 200 && data.errors) {
        return Promise.reject({ ...data.errors })
      } else if (status === 201) {
        return Promise.resolve()
      }
    })
    .catch(error => Promise.reject(error))
}

export const AUTH_LOGIN_SUCCESS = 'AUTH_LOGIN_SUCCESS'

const loginSuccess = (user, credentials) => ({ type: AUTH_LOGIN_SUCCESS, user, credentials })
const loginRequest = values => axios.post(`${process.env.API_URL}/auth/sign_in`, values)
export const login = values => dispatch => loginRequest(values)
  .then(response => {
    const { headers, data: { data: user } } = response
    const credentials = {
      'Access-Token': headers['access-token'],
      'Token-Type': headers['token-type'],
      Expiry: headers['expiry'],
      Uid: headers['uid'],
      Client: headers['client']
    }

    // Create a session into the server-side rendering server
    axios.post(`/auth/login`, { credentials, user })

    dispatch(loginSuccess(user, credentials))
  })
  .catch(error => {
    if (error.response) {
      const { response: { data: { errors }, status } } = error
      if (status === 401) return Promise.reject({ _error: errors.join('') })
    }
    return Promise.reject({ _error: `Response ${error}` })
  })


// Use clientMiddleware pattern
export const logout = () => ({
  types: [AUTH_LOGOUT_REQUEST, AUTH_LOGOUT_SUCCESS, AUTH_LOGOUT_FAILURE],
  promise: client => client.get('/logout')
})
