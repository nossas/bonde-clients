import reactCookie from 'react-cookie'
import * as t from './action-types'

export const initialState = {
  isLoaded: false,
  isLoading: false,
  saving: false,
  user: undefined,
  credentials: undefined,
  error: undefined
}
const UNIX_TIMESTAMP_MILLISECONDS_FIX = 1000

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case t.LOGIN_REQUEST:
      return {
        ...state,
        isLoading: true
      }
    case t.LOAD_SUCCESS:
      return {
        ...state,
        isLoaded: true,
        isLoading: false
      }
    case t.LOGIN_SUCCESS:
      reactCookie.save('auth',
        { auth: action.payload },
        { expires: new Date(action.payload.credentials.Expiry * UNIX_TIMESTAMP_MILLISECONDS_FIX) }
      )
      return {...state,
        isLoading: false,
        error: undefined,
        ...action.payload
      }
    case t.LOGOUT_SUCCESS:
      reactCookie.remove('auth')
      reactCookie.remove('community')
      return {
        ...state,
        isLoaded: false,
        isLoading: false,
        user: undefined,
        credentials: undefined
      }
    case t.LOGIN_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload
      }
    case t.UPDATE_USER_REQUEST:
      return {...state,
        saving: true
      }
    case t.UPDATE_USER_SUCCESS:
      reactCookie.save('auth', {
        auth: {
          credentials: state.credentials,
          user: action.payload
        }
      })
      return {...state,
        saving: false,
        user: action.payload
      }
    case t.UPDATE_USER_FAILURE:
      return {...state,
        saving: false,
        error: action.payload
      }
    default:
      return {...state}
  }
}
