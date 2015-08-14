import { AUTH_LOGIN_REQUEST, AUTH_LOGIN_SUCCESS, AUTH_LOGIN_FAILURE, AUTH_LOGOUT_REQUEST } from '../constants/ActionTypes'
import Auth from 'j-toker'

export function login(data) {
  return function (dispatch) {
    dispatch(loginRequest(data))

    return Auth.emailSignIn(data).then(
      user => dispatch(loginSuccess(user)),
      error => dispatch(loginFailure(error.data.errors[0]))
    )
  }
}

export function loginRequest(data) {
  return {
    type: AUTH_LOGIN_REQUEST,
    data
  }
}

export function loginSuccess(user) {
  return {
    type: AUTH_LOGIN_SUCCESS,
    user
  }
}

export function loginFailure(error) {
  return {
    type: AUTH_LOGIN_FAILURE,
    error
  }
}

export function logout() {
  return {
    type: AUTH_LOGOUT_REQUEST
  }
}
