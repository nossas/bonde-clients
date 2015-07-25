import * as actions from '../constants/ActionTypes';

export default function widgets(state = [], action) {
  switch (action.type) {
    case actions.EDIT_WIDGET:
      return state.map(widget =>
        widget.id == action.widget.id ? action.widget : widget
      )
    case actions.FETCH_WIDGETS:
      return action.widgets
    default:
      return state
  }
}
