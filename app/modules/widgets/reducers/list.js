import { UPDATE_MATCH, DELETE_MATCH } from '../../../scripts/constants/ActionTypes'
import * as t from '../../../modules/widgets/action-types'
import * as matchActionTypes from '../../../modules/widgets/__plugins__/match/action-types'
import {
  REQUEST_FETCH_GOOGLE_FONTS,
  SUCCESS_FETCH_GOOGLE_FONTS,
  FAILURE_FETCH_GOOGLE_FONTS,

  TOOLBAR_SET_LINK_OPEN_STRATEGY,

  REQUEST_FILL_WIDGET,
  SUCCESS_FILL_WIDGET,
  FAILURE_FILL_WIDGET,
} from '../../../scripts/Widget/actions'

const ADD_FORM_ENTRY = 'ADD_FORM_ENTRY'

const initialState = {
  loaded: false,
  data: [],
  saving: false,
  error: undefined,
}


export default function reducer(state = initialState, action) {
  let data

  switch (action.type) {
    //
    // Async Actions
    //
    case t.REQUEST_ASYNC_WIDGET_UPDATE:
      return { ...state, saving: true }
    case t.SUCCESS_ASYNC_WIDGET_UPDATE:
      data = state.data.map(widget => widget.id === action.payload.id ? action.payload : widget)
      return { ...state, data, saving: false }
    case t.FAILURE_ASYNC_WIDGET_UPDATE:
      return { ...state, saving: false, error: action.payload }

    case t.REQUEST_ASYNC_WIDGET_FETCH:
      return { ...state, loaded: false }
    case t.SUCCESS_ASYNC_WIDGET_FETCH:
      return { ...state, loaded: true, data: action.payload  }
    case t.FAILURE_ASYNC_WIDGET_FETCH:
      return { ...state, loaded: true, error: action.payload }

    case t.REQUEST_ASYNC_WIDGET_SELECT:
      return { ...state, loaded: false }
    case t.SUCCESS_ASYNC_WIDGET_SELECT:
      return { ...state, loaded: true, data: action.payload  }
    case t.FAILURE_ASYNC_WIDGET_SELECT:
      return { ...state, loaded: true, error: action.payload }

    case t.EXPORT_DATACLIP_SUCCESS:
      data = state.data.map(widget => {
        const exported_at = widget.id === action.payload.widget.id ? new Date() : undefined
        return { ...widget, exported_at }
      })
      return { ...state, data }

    case matchActionTypes.WIDGET_MATCH_CREATE_SUCCESS:
      data = state.data.map(widget => {
        if (widget.id === action.payload.widget_id) {
          if (!widget.match_list.includes(action.payload)) {
            widget.match_list.push(action.payload)
          }
        }
        return widget
      })
      return { ...state, data }

    //
    // Needs refactoring
    //
    case REQUEST_FILL_WIDGET:
      return { ...state, saving: true }
    case SUCCESS_FILL_WIDGET:
      data = state.data.map(widget => widget.id === action.counter.id ?
        { ...widget, ...action.counter, filled: true } : widget
      )
      return { ...state, data, saving: false }
    case FAILURE_FILL_WIDGET:
      return { ...state, saving: false, error: action.error }

    case ADD_FORM_ENTRY:
      return {...state,
        data: state.data.map(
          widget => widget.id === action.form_entry.widget_id ? {...widget, form_entries_count: widget.form_entries_count + 1} : widget
        )
      }
    case UPDATE_MATCH:
      return {
        ...state,
        data: state.data.map(
          widget => {
            if (widget.id === action.match.widget_id) {
              widget.match_list = widget.match_list.map(match => match.id === action.match.id ? action.match : match)
            }
            return widget
          }
        )
      }
    case DELETE_MATCH:
      return {
        ...state,
        data: state.data.map(widget => {
          if (widget.id === parseInt(action.widget_id)) {
            widget.match_list = widget.match_list.filter(match => {
              return !action.deleted_matches.includes(match.id)
            })
          }
          return widget
        })
      }

    case REQUEST_FETCH_GOOGLE_FONTS:
      return { ...state, loaded: false, loading: true }
    case SUCCESS_FETCH_GOOGLE_FONTS:
      return { ...state, loaded: true, loading: false, googleFonts: action.fonts }
    case FAILURE_FETCH_GOOGLE_FONTS:
      return { ...state, loaded: true, loading: false, error: action.error }

    case TOOLBAR_SET_LINK_OPEN_STRATEGY:
      return { ...state, toolbarLinkOpenStrategy: action.strategy }

    default:
      return state
  }
}
