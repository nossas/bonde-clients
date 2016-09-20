import {
  REQUEST_FETCH_BLOCKS,
  SUCCESS_FETCH_BLOCKS,
  FAILURE_FETCH_BLOCKS,

  SET_SELECTED_LAYOUT
} from './BlockActions'

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
    case SET_SELECTED_LAYOUT:
      return {
        ...state,
        selectedLayout: action.layout
      }
    default:
      return state
  }
}

export default BlockReducer
