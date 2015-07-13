import { EDIT_WIDGET } from '../constants/ActionTypes';

const initialState = [
  {
    id: 1,
    block_id: 1,
    size: 12,
    content: "col-12",
    kind: "content"
  }
]

export default function widgets(state = initialState, action) {
  switch (action.type) {
    case EDIT_WIDGET:
      return state.map(widget =>
        widget.id === action.id ? {...widget, content: action.content} : widget
      )
    default:
      return state
  }
}
