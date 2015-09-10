import superagent from 'superagent'

const REQUEST_FETCH_BLOCKS = 'REQUEST_FETCH_BLOCKS'
const SUCCESS_FETCH_BLOCKS = 'SUCCESS_FETCH_BLOCKS'
const FAILURE_FETCH_BLOCKS = 'FAILURE_FETCH_BLOCKS'
const EDIT_BLOCK = 'EDIT_BLOCK'
const REMOVE_BLOCK = 'REMOVE_BLOCK'
const MOVE_BLOCK_UP = 'MOVE_BLOCK_UP'
const MOVE_BLOCK_DOWN = 'MOVE_BLOCK_DOWN'

const initialState = {
  loaded: false,
  data: []
}

export default function blocks(state = initialState, action) {
  switch (action.type) {
    case REQUEST_FETCH_BLOCKS:
      return {...state, loaded: false}
    case SUCCESS_FETCH_BLOCKS:
      return {...state, loaded: true, data: action.result }
    case FAILURE_FETCH_BLOCKS:
      return {...state, loaded: true}
    case EDIT_BLOCK:
      return state.map(block =>
        block.id === action.block.id ? action.block : block
      )
    case MOVE_BLOCK_UP:
      return state.map((block, index) => {
        if (index + 1 < state.length && state[index + 1].id === action.block.id) {
          return action.block
        } else if (block.id === action.block.id) {
          return state[index - 1]
        }
        return block
      })
    case MOVE_BLOCK_DOWN:
      return state.map((block, index) => {
        if (index > 0 && state[index - 1].id === action.block.id) {
          return action.block
        } else if (block.id === action.block.id) {
          return state[index + 1]
        }
        return block
      })
    case REMOVE_BLOCK:
      return state.filter(block =>
        action.block.id !== block.id
      )
    default:
      return state
  }
}

export function isBlocksLoaded(globalState) {
  return globalState.blocks.loaded
}

export function fetchBlocks(options) {
  return {
    types: [REQUEST_FETCH_BLOCKS, SUCCESS_FETCH_BLOCKS, FAILURE_FETCH_BLOCKS],
    promise: function() {
      return new Promise(function(resolve, reject) {
        superagent.get(`http://localhost:3000/mobilizations/${options.mobilization_id}/blocks`).end((err, res) => {
          if (err) {
            reject(res.body || err)
          } else {
            resolve(res.body)
          }
        })
      })
    }
  }
}
