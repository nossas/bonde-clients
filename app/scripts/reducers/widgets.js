import * as actions from '../constants/ActionTypes';

export default function widgets(state = [], action) {
  switch (action.type) {
    case actions.EDIT_WIDGET:
      return state.map(widget =>
        widget.id == action.widget.id ? action.widget : widget
      )
    case actions.FETCH_WIDGETS:
      return action.widgets
    case actions.ADD_FORM_ENTRY:
      return state.map(widget =>
        widget.id == action.form_entry.widget_id ? {...widget, form_entries_count: widget.form_entries_count + 1} : widget
      )
    default:
      return state
  }
}
