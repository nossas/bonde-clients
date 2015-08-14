import { AUTH_LOGIN_REQUEST, AUTH_LOGIN_SUCCESS, AUTH_LOGIN_FAILURE, AUTH_LOGOUT_REQUEST } from './../constants/ActionTypes'

export default function auth(state = [], action) {
  const { type, user, error } = action

  switch (type) {
    case AUTH_LOGIN_REQUEST:
      return {...state,
        user: null,
        submitting: true,
        error: null
      }
    case AUTH_LOGIN_SUCCESS:
      return {...state,
        user: user,
        submitting: false,
        error: null
      }
    case AUTH_LOGIN_FAILURE:
      return {...state,
        user: null,
        submitting: false,
        error: error
      }
    case AUTH_LOGOUT_REQUEST:
      return {...state,
        user: null,
        submitting: true,
        error: null
      }
    default:
      return state
  }
}
