import reactCookie from 'react-cookie'
import * as t from './action-types'

export const initialState = {
  isLoaded: false,
  isLoading: false,
  user: undefined,
  credentials: undefined,
  error: undefined
}

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
      reactCookie.save('auth', { auth: { ...action.payload } })
      return {...state,
        isLoading: false,
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
    default:
      return {...state}
  }
}
