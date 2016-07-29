import {
  REQUEST_FETCH_MOBILIZATIONS,
  SUCCESS_FETCH_MOBILIZATIONS,
  FAILURE_FETCH_MOBILIZATIONS
} from '../MobilizationActions'


const initialState = {
  loading: false,
  loaded: false,
  data: []
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case REQUEST_FETCH_MOBILIZATIONS:
      return {
        ...state,
        loading: true,
        loaded: false
      }
    case SUCCESS_FETCH_MOBILIZATIONS:
      return {
        ...state,
        loading: false,
        loaded: true,
        data: action.result
      }
    case FAILURE_FETCH_MOBILIZATIONS:
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

export default reducer
