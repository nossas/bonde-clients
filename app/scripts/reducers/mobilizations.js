import superagent from 'superagent'

import {
  REQUEST_FETCH_MOBILIZATIONS,
  SUCCESS_FETCH_MOBILIZATIONS,
  FAILURE_FETCH_MOBILIZATIONS,
  EDIT_MOBILIZATION,
  ADD_MOBILIZATION
} from './../constants/ActionTypes'

const initialState = {
  loaded: false,
  data: []
}

export default function mobilizations(state = initialState, action) {
  switch (action.type) {
    case REQUEST_FETCH_MOBILIZATIONS:
      return {...state, loaded: false}
    case SUCCESS_FETCH_MOBILIZATIONS:
      return {...state, data: action.result, loaded: true}
    case FAILURE_FETCH_MOBILIZATIONS:
      return {...state, loaded: true}

    // TODO impllement REQUEST, SUCCESS and FAILURE action types
    case ADD_MOBILIZATION:
      return {...state, data: [action.mobilization, ...state.data]}

    // TODO impllement REQUEST, SUCCESS and FAILURE action types
    case EDIT_MOBILIZATION:
      return {
        ...state,
        data: state.data.map(
          m => m.id === action.mobilization.id ? action.mobilization : m
        )
      }
    default:
      return state
  }
}

export function isMobilizationsLoaded(globalState) {
  return globalState.mobilizations.loaded
}

export function fetchMobilizations() {
  return {
    types: [REQUEST_FETCH_MOBILIZATIONS, SUCCESS_FETCH_MOBILIZATIONS, FAILURE_FETCH_MOBILIZATIONS],
    promise: function() {
      return new Promise(function(resolve, reject) {
        superagent.get(`${process.env.API_URL}/mobilizations`).end((err, res) => {
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
