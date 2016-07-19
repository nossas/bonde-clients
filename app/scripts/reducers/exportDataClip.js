import {
  EXPORT_DATACLIP_REQUEST,
  EXPORT_DATACLIP_FAILURE,
  EXPORT_DATACLIP_SUCCESS
} from '../actions/ExportActions'


const initialState = {
  loading: false
}

export default function exportDataClip(state=initialState, action) {
  switch (action.type) {
    case EXPORT_DATACLIP_REQUEST:
      return {
        ...state,
        loading: true
      }
    case EXPORT_DATACLIP_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error
      }
    case EXPORT_DATACLIP_SUCCESS:
      return {
        ...state,
        loading: false,
        exported: true
      }
    default:
      return state
  }
}
