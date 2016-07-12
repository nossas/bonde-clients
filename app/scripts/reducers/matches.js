import superagent from 'superagent'
import {
  SHOW_MATCH_REQUEST,
  SHOW_MATCH_SUCCESS,
  SHOW_MATCH_FAILURE
} from '../constants/ActionTypes'

export const initialState = { data: [] }
export const initialAction = { type: '' }

export default function matches(state = initialState, action = initialAction) {
  switch (action.type) {
    case SHOW_MATCH_REQUEST: return { ...state }
    case SHOW_MATCH_SUCCESS: return { ...state, data: action.result }
    case SHOW_MATCH_FAILURE: return { ...state }
    default: return state
  }
}

const handleError = (resolve, reject) => {
  return (err, res) => {
    if (err) reject(res.body || err)
    else resolve(res.body)
  }
}

export const showMatch = (params = {}) => {
  return {
    types: [SHOW_MATCH_REQUEST, SHOW_MATCH_SUCCESS, SHOW_MATCH_FAILURE],
    promise: () => new Promise((resolve, reject) => {
      superagent.get(`${process.env.API_URL}/matches/65`)
      .end(handleError(resolve, reject))
    })
  }
}
