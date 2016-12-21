import c from '../../mobilizations/blocks/constants'

export const initialState = {
  loaded: false,
  data: [],
  error: undefined,
  uploadingBackgroundImage: false,
  uploadedBackgroundImage: undefined,
}

export default function BlockReducers(state = initialState, action) {
  let data

  switch (action.type) {
    //
    // Async Actions
    //
    case c.REQUEST_ASYNC_BLOCK_FETCH:
      return { ...state, loaded: false }
    case c.SUCCESS_ASYNC_BLOCK_FETCH:
      return { ...state, loaded: true, data: action.payload }
    case c.FAILURE_ASYNC_BLOCK_FETCH:
      return { ...state, loaded: true, error: action.payload }

    case c.REQUEST_ASYNC_BLOCK_CREATE:
      return { ...state, loaded: false }
    case c.SUCCESS_ASYNC_BLOCK_CREATE:
      return { ...state, loaded: true, data: state.data.concat([action.payload]) }
    case c.FAILURE_ASYNC_BLOCK_CREATE:
      return { ...state, loaded: true, error: action.payload }

    case c.REQUEST_ASYNC_BLOCK_UPDATE:
      return { ...state, loaded: false }
    case c.SUCCESS_ASYNC_BLOCK_UPDATE:
      data = state.data.map(block => block.id === action.payload.id ? action.payload : block)
      return { ...state, loaded: true, data }
    case c.FAILURE_ASYNC_BLOCK_UPDATE:
      return { ...state, loaded: true, error: action.payload }

    case c.REQUEST_ASYNC_BLOCK_SELECT:
      return { ...state, loaded: false }
    case c.SUCCESS_ASYNC_BLOCK_SELECT:
      return { ...state, loaded: true, data: action.payload  }
    case c.FAILURE_ASYNC_BLOCK_SELECT:
      return { ...state, loaded: true, error: action.payload }

    case c.REQUEST_ASYNC_BLOCK_DESTROY:
      return { ...state, loaded: false }
    case c.SUCCESS_ASYNC_BLOCK_DESTROY:
      data = state.data.filter(block => action.payload.id !== block.id)
      return { ...state, loaded: true, data }
    case c.FAILURE_ASYNC_BLOCK_DESTROY:
      return { ...state, loaded: true, error: action.payload }

    case c.REQUEST_ASYNC_BLOCK_MOVE_UP:
      return { ...state, loaded: false }
    case c.SUCCESS_ASYNC_BLOCK_MOVE_UP:
      data = state.data.map((block, index) => {
        if (index + 1 < state.data.length && state.data[index + 1].id === action.payload.id) {
          return action.payload
        } else if (block.id === action.payload.id) {
          return state.data[index - 1]
        }
        return block
      })
      return { ...state, loaded: true, data }
    case c.FAILURE_ASYNC_BLOCK_MOVE_UP:
      return { ...state, loaded: true, error: action.payload }

    case c.REQUEST_ASYNC_BLOCK_MOVE_DOWN:
      return { ...state, loaded: false }
    case c.SUCCESS_ASYNC_BLOCK_MOVE_DOWN:
      data = state.data.map((block, index) => {
        if (index > 0 && state.data[index - 1].id === action.payload.id) {
          return action.payload
        } else if (block.id === action.payload.id) {
          return state.data[index + 1]
        }
        return block
      })
      return { ...state, loaded: true, data }
    case c.FAILURE_ASYNC_BLOCK_MOVE_DOWN:
      return { ...state, loaded: true, error: action.payload }

    //
    // Sync Actions
    //
    case c.BLOCK_SELECTED_LAYOUT:
      return { ...state, selectedLayout: action.layout }

    case c.BLOCK_BACKGROUND_IMAGE_UPLOADING:
      return { ...state, uploadingBackgroundImage: action.uploading }
    case c.BLOCK_BACKGROUND_IMAGE_UPLOADED:
      return { ...state, uploadedBackgroundImage: action.image }

    default:
      return state
  }
}
