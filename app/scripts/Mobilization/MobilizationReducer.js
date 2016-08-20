import {
  REQUEST_FETCH_MOBILIZATIONS,
  SUCCESS_FETCH_MOBILIZATIONS,
  FAILURE_FETCH_MOBILIZATIONS
} from './MobilizationActions'

import { SUCCESS_ADD_MOBILIZATION, SUCCESS_EDIT_MOBILIZATION } from './MobilizationActions'

const initialState = {
  loading: false,
  loaded: false,
  data: []
}

const MobilizationReducer = (state = initialState, action) => {
  switch (action.type) {
    case REQUEST_FETCH_MOBILIZATIONS:
      return {
        ...state,
        loading: true,
        loaded: false,
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
    case SUCCESS_ADD_MOBILIZATION:
    // Update list with new mobilization added
      return {
        ...state,
        data: [action.mobilization, ...state.data]
      }
    case SUCCESS_EDIT_MOBILIZATION:
      return {
        ...state,
        data: state.data.map(
          mob => mob.id === action.mobilization.id ? action.mobilization : mob
        )
      }
    default:
      return state
  }
}

export default MobilizationReducer
