//
// Constants
//
export const SET_SELECTED_LAYOUT = 'SET_SELECTED_LAYOUT'

export const PROGRESS_UPLOAD_BLOCK_BG_IMAGE = 'PROGRESS_UPLOAD_BLOCK_BG_IMAGE'
export const FINISH_UPLOAD_BLOCK_BG_IMAGE = 'FINISH_UPLOAD_BLOCK_BG_IMAGE'
export const SET_UPLOADED_BLOCK_BACKGROUND_IMAGE = 'SET_UPLOADED_BLOCK_BACKGROUND_IMAGE'

export const MOVE_BLOCK_DOWN = 'MOVE_BLOCK_DOWN'

export const setSelectedLayout = layout => ({ type: SET_SELECTED_LAYOUT, layout })

export const progressUploadBlockBackgroundImage = () => ({
  type: PROGRESS_UPLOAD_BLOCK_BG_IMAGE
})
export const finishUploadBlockBackgroundImage = () => ({
  type: FINISH_UPLOAD_BLOCK_BG_IMAGE
})
export const setUploadedBlockBackgroundImage = image => ({
  type: SET_UPLOADED_BLOCK_BACKGROUND_IMAGE,
  image
})
