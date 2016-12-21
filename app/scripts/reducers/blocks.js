import { constants as c } from '../../modules/mobilizations/blocks'

const initialState = {
  loaded: false,
  data: [],
}

export default function BlockReducer(state = initialState, action) {
  let data

  switch (action.type) {
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

    default:
      return state
  }
}

export function isBlocksLoaded(globalState) {
  return globalState.blocks.loaded
}
