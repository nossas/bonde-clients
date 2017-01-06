import {
  SHOW_MATCH_REQUEST,
  SHOW_MATCH_SUCCESS,
  SHOW_MATCH_FAILURE
} from '../../../constants/ActionTypes'
import {
  REQUEST_ADD_ACTIVIST_MATCH,
  SUCCESS_ADD_ACTIVIST_MATCH,
  FAILURE_ADD_ACTIVIST_MATCH
} from './actions'

export const initialState = { data: [] }
export const initialAction = { type: '' }

export default function matches (state = initialState, action = initialAction) {
  switch (action.type) {
    case SHOW_MATCH_REQUEST: return { ...state }
    case SHOW_MATCH_SUCCESS: return { ...state, data: action.result }
    case SHOW_MATCH_FAILURE: return { ...state }
    case REQUEST_ADD_ACTIVIST_MATCH: return { ...state, loading: true }
    case SUCCESS_ADD_ACTIVIST_MATCH: return { ...state, loading: false }
    case FAILURE_ADD_ACTIVIST_MATCH: return { ...state, loading: false }
    default: return state
  }
}
