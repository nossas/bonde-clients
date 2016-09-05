import {
  REQUEST_FETCH_MOBILIZATIONS,
  SUCCESS_FETCH_MOBILIZATIONS,
  FAILURE_FETCH_MOBILIZATIONS,

  ADD_MOBILIZATION,
  EDIT_MOBILIZATION,

  PROGRESS_UPLOAD_FACEBOOK_IMAGE,
  FINISH_UPLOAD_FACEBOOK_IMAGE,

  SET_CURRENT_MOBILIZATION,
  SET_MOUSE_OVER
} from './MobilizationActions'

export const initialState = {
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
    case PROGRESS_UPLOAD_FACEBOOK_IMAGE:
      return {
        ...state,
        isFacebookShareImageUploading: true
      }
    case FINISH_UPLOAD_FACEBOOK_IMAGE:
      return {
        ...state,
        isFacebookShareImageUploading: false
      }
    case ADD_MOBILIZATION:
    // Update list with new mobilization added
      return {
        ...state,
        data: [action.mobilization, ...state.data]
      }
    case EDIT_MOBILIZATION:
      return {
        ...state,
        data: state.data.map(
          mob => mob.id === action.mobilization.id ? action.mobilization : mob
        )
      }
    case SET_CURRENT_MOBILIZATION:
      return {
        ...state,
        currentId: action.currentId
      }
    default:
      return state
  }
}

export default MobilizationReducer
