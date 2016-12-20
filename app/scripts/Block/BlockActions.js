import request from 'superagent'

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

// TODO: Refatorar funções abaixo
export function moveBlockDown(params) {
  const { block, blocks } = params
  return dispatch => {
    $.ajax(`${process.env.API_URL}/mobilizations/${params.mobilization_id}/blocks/${block.id}`, {
      method: 'put',
      data: {
        block: {
          position: blocks.data[blocks.data.indexOf(block) + 1].position
        }
      },
      headers: params.credentials,
      success: function(data, textStatus, jqXHR){
        dispatch({
          type: MOVE_BLOCK_DOWN,
          block: data
        })
      }
    })
  }
}
