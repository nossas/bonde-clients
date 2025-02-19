import * as t from '../action-types'

const initialState = {
  loading: false,
  success: false,
  error: undefined
}

export default function dataExport (state = initialState, action = {}) {
  switch (action.type) {
    case t.EXPORT_DATACLIP_REQUEST:
      return { ...state, loading: true }
    case t.EXPORT_DATACLIP_SUCCESS:
      return { ...state, loading: false, success: true }
    case t.EXPORT_DATACLIP_FAILURE:
      return { ...state, loading: false, error: action.payload }

    case t.EXPORT_DATACLIP_NO_DATA_FOUND:
      return initialState
    case t.EXPORT_DATACLIP_MOUNT:
      return initialState

    default:
      return state
  }
}
