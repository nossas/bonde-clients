import {
  REQUEST_FETCH_MOBILIZATIONS, SUCCESS_FETCH_MOBILIZATIONS, FAILURE_FETCH_MOBILIZATIONS,
  EDIT_MOBILIZATION, ADD_MOBILIZATION
} from './../constants/ActionTypes'

import superagent from 'superagent'

const initialState = {
  loaded: false,
  data: []
}

export default function mobilizations(state = initialState, action) {
  switch (action.type) {
    case REQUEST_FETCH_MOBILIZATIONS:
      return {
        data: [],
        loaded: false
      }
    case SUCCESS_FETCH_MOBILIZATIONS:
      return {
        data: action.result,
        loaded: true
      }
    case FAILURE_FETCH_MOBILIZATIONS:
      return {
        data: [],
        loaded: true
      }
    case ADD_MOBILIZATION:
      return [action.mobilization, ...state]
    case EDIT_MOBILIZATION:
      return state.map(mobilization =>
        mobilization.id === action.mobilization.id ? action.mobilization : mobilization
      )
    default:
      return state
  }
}

export function isMobilizationsLoaded(globalState) {
  return globalState.mobilizations.loaded
}

export function loadMobilizations() {
  return {
    types: [REQUEST_FETCH_MOBILIZATIONS, SUCCESS_FETCH_MOBILIZATIONS, FAILURE_FETCH_MOBILIZATIONS],
    promise: function() {
      return new Promise(function(resolve, reject) {
        superagent.get(`${__API_URL__}/mobilizations`).end((err, res) => {
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
