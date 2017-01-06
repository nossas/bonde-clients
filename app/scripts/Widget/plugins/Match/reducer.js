import {
  REQUEST_ADD_ACTIVIST_MATCH,
  SUCCESS_ADD_ACTIVIST_MATCH,
  FAILURE_ADD_ACTIVIST_MATCH
} from './actions'

export const initialState = { data: [] }
export const initialAction = { type: '' }

export default function matches (state = initialState, action = initialAction) {
  switch (action.type) {
    case REQUEST_ADD_ACTIVIST_MATCH: return { ...state, loading: true }
    case SUCCESS_ADD_ACTIVIST_MATCH: return { ...state, loading: false }
    case FAILURE_ADD_ACTIVIST_MATCH: return { ...state, loading: false }
    default: return state
  }
}
