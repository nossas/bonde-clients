import {
  SET_SELECTED_LAYOUT,
  PROGRESS_UPLOAD_BLOCK_BG_IMAGE,
  FINISH_UPLOAD_BLOCK_BG_IMAGE,
  SET_UPLOADED_BLOCK_BACKGROUND_IMAGE
} from './BlockActions'

const initialState = {
  loading: false,
  loaded: false,
  data: []
}

const BlockReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_SELECTED_LAYOUT:
      return {
        ...state,
        selectedLayout: action.layout
      }
    case PROGRESS_UPLOAD_BLOCK_BG_IMAGE:
      return {
        ...state,
        isBlockBackgroundImageUploading: true
      }
    case FINISH_UPLOAD_BLOCK_BG_IMAGE:
      return {
        ...state,
        isBlockBackgroundImageUploading: false
      }
    case SET_UPLOADED_BLOCK_BACKGROUND_IMAGE:
      return {
        ...state,
        uploadedBackgroundImage: action.image
      }
    default:
      return state
  }
}

export default BlockReducer
