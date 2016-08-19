import $ from 'jquery'

import request from 'superagent'

import {
  AUTH_LOGOUT_REQUEST, AUTH_LOGOUT_SUCCESS, AUTH_LOGOUT_FAILURE
} from '../constants/ActionTypes'


export const AUTH_LOGIN_SUCCESS = 'AUTH_LOGIN_SUCCESS'


const loginSuccess = (user, credentials) => ({ type: AUTH_LOGIN_SUCCESS, user, credentials })

export const login = (values, dispatch) => {
  /*
   * this action apply behavior of redux-form 5.3.1 to asyncronos validation
   * http://redux-form.com/5.3.1/#/examples/submit-validation?_k=kld09s
   */
  return new Promise((resolve, reject) => {
    request
      .post(`${process.env.API_URL}/auth/sign_in`)
      .send({...values})
      .end((err, res) => {
        if (err && err.status === 401) {
          reject({ _error: res.body.errors.join('') })
        } else if (err) {
          reject({ _error: `Response Error: ${err.status}` })
        } else {
          const credentials = {
            "Access-Token": res.header['Access-Token'],
            "Expiry": res.header['Expiry'],
            "Token-Type": res.header['Token-Type'],
            "Uid": res.header['Uid'],
            "Client": res.header['Client']
          }
          const user = res.body.data

          // Create a session into the server-side rendering server
          request.post(`/api/login`).send({ credentials, user })

          dispatch(loginSuccess(user, credentials))
          resolve()
        }
      })
  })
}

export function logout() {
  return function (dispatch) {
    dispatch(logoutRequest())

    return Auth.signOut().then(
      user => dispatch(logoutSuccess()),
      error => dispatch(logoutFailure(error.data.errors[0]))
    )
  }
}

export function logoutRequest() {
  return {
    type: AUTH_LOGOUT_REQUEST
  }
}

export function logoutSuccess() {
  return {
    type: AUTH_LOGOUT_SUCCESS
  }
}

export function logoutFailure(error) {
  return {
    type: AUTH_LOGOUT_FAILURE,
    error
  }
}
