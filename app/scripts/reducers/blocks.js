import superagent from 'superagent'

import {
  REQUEST_ASYNC_BLOCK_FETCH,
  SUCCESS_ASYNC_BLOCK_FETCH,
  FAILURE_ASYNC_BLOCK_FETCH,

  REQUEST_ASYNC_BLOCK_CREATE,
  SUCCESS_ASYNC_BLOCK_CREATE,
  FAILURE_ASYNC_BLOCK_CREATE,

  REQUEST_ASYNC_BLOCK_UPDATE,
  SUCCESS_ASYNC_BLOCK_UPDATE,
  FAILURE_ASYNC_BLOCK_UPDATE,

  REQUEST_ASYNC_BLOCK_SELECT,
  SUCCESS_ASYNC_BLOCK_SELECT,
  FAILURE_ASYNC_BLOCK_SELECT,

  REQUEST_ASYNC_BLOCK_DESTROY,
  SUCCESS_ASYNC_BLOCK_DESTROY,
  FAILURE_ASYNC_BLOCK_DESTROY,

  REQUEST_ASYNC_BLOCK_MOVE_UP,
  SUCCESS_ASYNC_BLOCK_MOVE_UP,
  FAILURE_ASYNC_BLOCK_MOVE_UP,
} from '../../modules/mobilizations/blocks/action-types'

const MOVE_BLOCK_DOWN = 'MOVE_BLOCK_DOWN'

const initialState = {
  loaded: false,
  data: [],
}

export default function blocks(state = initialState, action) {
  let data

  switch (action.type) {
    case REQUEST_ASYNC_BLOCK_FETCH:
      return { ...state, loaded: false }
    case SUCCESS_ASYNC_BLOCK_FETCH:
      return { ...state, loaded: true, data: action.payload }
    case FAILURE_ASYNC_BLOCK_FETCH:
      return { ...state, loaded: true, error: action.payload }

    case REQUEST_ASYNC_BLOCK_CREATE:
      return { ...state, loaded: false }
    case SUCCESS_ASYNC_BLOCK_CREATE:
      return { ...state, loaded: true, data: state.data.concat([action.payload]) }
    case FAILURE_ASYNC_BLOCK_CREATE:
      return { ...state, loaded: true, error: action.payload }

    case REQUEST_ASYNC_BLOCK_UPDATE:
      return { ...state, loaded: false }
    case SUCCESS_ASYNC_BLOCK_UPDATE:
      data = state.data.map(block => block.id === action.payload.id ? action.payload : block)
      return { ...state, loaded: true, data }
    case FAILURE_ASYNC_BLOCK_UPDATE:
      return { ...state, loaded: true, error: action.payload }

    case REQUEST_ASYNC_BLOCK_SELECT:
      return { ...state, loaded: false }
    case SUCCESS_ASYNC_BLOCK_SELECT:
      return { ...state, loaded: true, data: action.payload  }
    case FAILURE_ASYNC_BLOCK_SELECT:
      return { ...state, loaded: true, error: action.payload }

    case REQUEST_ASYNC_BLOCK_DESTROY:
      return { ...state, loaded: false }
    case SUCCESS_ASYNC_BLOCK_DESTROY:
      data = state.data.filter(block => action.payload.id !== block.id)
      return { ...state, loaded: true, data }
    case FAILURE_ASYNC_BLOCK_DESTROY:
      return { ...state, loaded: true, error: action.payload }

    case REQUEST_ASYNC_BLOCK_MOVE_UP:
      return { ...state, loaded: false }
    case SUCCESS_ASYNC_BLOCK_MOVE_UP:
      data = state.data.map((block, index) => {
        if (index + 1 < state.data.length && state.data[index + 1].id === action.payload.id) {
          return action.payload
        } else if (block.id === action.payload.id) {
          return state.data[index - 1]
        }
        return block
      })
      return { ...state, loaded: true, data }
    case FAILURE_ASYNC_BLOCK_MOVE_UP:
      return { ...state, loaded: true, error: action.payload }

    // Needs to migrate reducers below

    case MOVE_BLOCK_DOWN:
      return {...state,
        data: state.data.map((block, index) => {
          if (index > 0 && state.data[index - 1].id === action.block.id) {
            return action.block
          } else if (block.id === action.block.id) {
            return state.data[index + 1]
          }
          return block
        })
      }

    default:
      return state
  }
}

export function isBlocksLoaded(globalState) {
  return globalState.blocks.loaded
}
