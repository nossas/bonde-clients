import * as t from '../action-types'
import {
  REQUEST_FETCH_GOOGLE_FONTS,
  SUCCESS_FETCH_GOOGLE_FONTS,
  FAILURE_FETCH_GOOGLE_FONTS,

  TOOLBAR_SET_LINK_OPEN_STRATEGY
} from '../../../scripts/Widget/actions'

const ADD_FORM_ENTRY = 'ADD_FORM_ENTRY'

const initialState = {
  loaded: false,
  data: [],
  saving: false,
  error: undefined
}

export default function reducer (state = initialState, action) {
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
      return { ...state, loaded: true, data: action.payload }
    case t.FAILURE_ASYNC_WIDGET_FETCH:
      return { ...state, loaded: true, error: action.payload }

    case t.REQUEST_ASYNC_WIDGET_SELECT:
      return { ...state, loaded: false }
    case t.SUCCESS_ASYNC_WIDGET_SELECT:
      return { ...state, loaded: true, data: action.payload }
    case t.FAILURE_ASYNC_WIDGET_SELECT:
      return { ...state, loaded: true, error: action.payload }

    case t.EXPORT_DATACLIP_SUCCESS:
      data = state.data.map(widget => {
        const exportedAt = widget.id === action.payload.widget.id ? new Date() : undefined
        return { ...widget, exported_at: exportedAt }
      })
      return { ...state, data }

    //
    // Sync Actions
    //
    case t.SET_WIDGET_LIST:
      return { ...state, data: action.payload }

    //
    // Needs refactoring
    //
    case ADD_FORM_ENTRY:
      return {...state,
        data: state.data.map(
          widget => widget.id === action.form_entry.widget_id ? {...widget, form_entries_count: widget.form_entries_count + 1} : widget
        )
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
