import { REQUEST_FETCH_BLOCKS, SUCCESS_FETCH_BLOCKS, FAILURE_FETCH_BLOCKS } from './BlockActions'

const initialState = {
  loading: false,
  loaded: false,
  data: []
}

const BlockReducer = (state = initialState, action) => {
  switch (action.type) {
    case REQUEST_FETCH_BLOCKS:
      return {
        ...state,
        loading: true,
        loaded: false
      }
    case SUCCESS_FETCH_BLOCKS:
      return {
        ...state,
        loading: false,
        loaded: true,
        data: action.result
      }
    case FAILURE_FETCH_BLOCKS:
      return {
        ...state,
        loading: false,
        loaded: true,
        error: action.error
      }
    default:
      return state
  }
}

export default BlockReducer
