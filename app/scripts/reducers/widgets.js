import superagent from 'superagent'

const FETCH_WIDGETS_REQUEST = 'FETCH_WIDGETS_REQUEST'
const FETCH_WIDGETS_SUCCESS = 'FETCH_WIDGETS_SUCCESS'
const FETCH_WIDGETS_FAILURE = 'FETCH_WIDGETS_FAILURE'

const REQUEST_FIND_WIDGETS = 'REQUEST_FIND_WIDGETS'
const SUCCESS_FIND_WIDGETS = 'SUCCESS_FIND_WIDGETS'
const FAILURE_FIND_WIDGETS = 'FAILURE_FIND_WIDGETS'

const EDIT_WIDGET = 'EDIT_WIDGET'
const ADD_FORM_ENTRY = 'ADD_FORM_ENTRY'

const initialState = {
  loaded: false,
  data: []
}

export default function widgets(state = initialState, action) {
  switch (action.type) {
    case FETCH_WIDGETS_REQUEST:
      return {...state, loaded: false}
    case FETCH_WIDGETS_SUCCESS:
      return {...state, loaded: true, data: action.result }
    case FETCH_WIDGETS_FAILURE:
      return {...state, loaded: true}
    case REQUEST_FIND_WIDGETS:
      return {...state, loaded: false}
    case SUCCESS_FIND_WIDGETS:
      return {...state, loaded: true, data: action.result }
    case FAILURE_FIND_WIDGETS:
      return {...state, loaded: true}
    case EDIT_WIDGET:
      return {...state,
        data: state.data.map(
          widget => widget.id === action.widget.id ? action.widget : widget
        )}
    case ADD_FORM_ENTRY:
      return {...state,
        data: state.data.map(
          widget => widget.id === action.form_entry.widget_id ? {...widget, form_entries_count: widget.form_entries_count + 1} : widget
        )
      }
    default:
      return state
  }
}

export function isWidgetsLoaded(globalState) {
  return globalState.blocks.loaded
}

export function fetchWidgets(options) {
  return {
    types: [FETCH_WIDGETS_REQUEST, FETCH_WIDGETS_SUCCESS, FETCH_WIDGETS_FAILURE],
    promise: function() {
      return new Promise(function(resolve, reject) {
        superagent.get(`${process.env.API_URL}/mobilizations/${options.mobilization_id}/widgets`).end((err, res) => {
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

export function findWidgets(options) {
  return {
    types: [REQUEST_FIND_WIDGETS, SUCCESS_FIND_WIDGETS, FAILURE_FIND_WIDGETS],
    promise: function() {
      return new Promise(function(resolve, reject) {
        superagent.get(`${process.env.API_URL}/widgets`)
        .send(options)
        .end((err, res) => {
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
