// import Auth from 'j-toker'
import {
  AUTH_LOGIN_REQUEST, AUTH_LOGIN_SUCCESS, AUTH_LOGIN_FAILURE,
  AUTH_LOGOUT_REQUEST, AUTH_LOGOUT_SUCCESS, AUTH_LOGOUT_FAILURE
} from '../constants/ActionTypes'

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
