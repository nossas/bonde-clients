import * as t from './action-types'

const initialState = {
  isLoaded: true,
  isLoading: false,
  // @revert To undefined
  user: {
    email: 'foo@bar.com'
  },
  credentials: {
    'Access-Token': '9pG-E14a2QD_2AMrf_5aPQ',
    'Token-Type': 'Bearer',
    'Expiry': '1488920190',
    'Uid': 'foo@bar.com',
    'Client': 'YKjNtT_50fW-h7cmzXSx3Q'
  },
  error: undefined
}

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case t.LOAD_REQUEST:
    case t.LOGIN_REQUEST:
    case t.LOGOUT_REQUEST:
      return {
        ...state,
        isLoading: true
      }
    case t.LOAD_SUCCESS:
      return {
        ...state,
        isLoaded: true,
        isLoading: false,
        ...action.payload  // insert user and credentials
      }
    case t.LOGIN_SUCCESS:
      return {
        ...state,
        isLoading: false,
        ...action.payload  // insert user and credentials
      }
    case t.LOGOUT_SUCCESS:
      return {
        ...state,
        isLoaded: false,
        isLoading: false,
        user: undefined,
        credentials: undefined
      }
    case t.LOAD_FAILURE:
      return {
        ...state,
        isLoaded: true,
        isLoading: false,
        error: action.payload
      }
    case t.LOGOUT_FAILURE:
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
