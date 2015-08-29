import $ from 'jquery'

import {
  AUTH_LOGIN_REQUEST, AUTH_LOGIN_SUCCESS, AUTH_LOGIN_FAILURE,
  AUTH_LOGOUT_REQUEST, AUTH_LOGOUT_SUCCESS, AUTH_LOGOUT_FAILURE
} from '../constants/ActionTypes'

const BASE_URL = process.env.BASE_URL

export function login(data) {
  return dispatch => {
    $.ajax(`${BASE_URL}/auth/sign_in`, {
      method: 'post',
      data: { ...data },
      beforeSend: function(jqXHR, settings){
        dispatch({
          type: AUTH_LOGIN_REQUEST
        })
      },
      success: function(data, textStatus, jqXHR){
        dispatch({
          type: AUTH_LOGIN_SUCCESS,
          data
        })
      },
      error: function(jqXHR, textStatus, errorThrown){
        dispatch({
          type: AUTH_LOGIN_FAILURE,
          error: jqXHR.responseJSON.errors[0]
        })
      }
    })
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
