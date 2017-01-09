import * as t from '../action-types'
import { TOOLBAR_SET_LINK_OPEN_STRATEGY } from '../../../scripts/Widget/actions'
import * as formActionTypes from '../__plugins__/form/action-types'

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
    case formActionTypes.WIDGET_FORM_ENTRY_CREATE_REQUEST:
      return { ...state, saving: true }
    case formActionTypes.WIDGET_FORM_ENTRY_CREATE_SUCCESS:
      data = state.data.map(widget =>
        widget.id === action.payload.widget_id
          ? { ...widget, form_entries_count: widget.form_entries_count + 1 }
          : widget
      )
      return { ...state, saving: false, data }
    case formActionTypes.WIDGET_FORM_ENTRY_CREATE_FAILURE:
      return { ...state, saving: false, error: action.payload }

    case TOOLBAR_SET_LINK_OPEN_STRATEGY:
      return { ...state, toolbarLinkOpenStrategy: action.strategy }

    default:
      return state
  }
}
