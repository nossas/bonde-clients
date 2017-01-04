import * as t from '../../../../modules/widgets/__plugins__/match/action-types'


export default function WidgetsMatchReducer(state = initialState, action) {
  let data
  switch (action.type) {
    case t.WIDGET_MATCH_CREATE_SUCCESS:
      data = state.data.map(widget => {
        if (widget.id === action.payload.widget_id) {
          if (!widget.match_list.includes(action.payload)) {
            widget.match_list.push(action.payload)
          }
        }
        return widget
      })
      return { ...state, data }

    case t.WIDGET_MATCH_UPDATE_SUCCESS:
      data = state.data.map(widget => {
        if (widget.id === action.payload.widget_id) {
          const mapMatch = match => match.id === action.payload.id ? action.payload : match
          widget.match_list = widget.match_list.map(mapMatch)
        }
        return widget
      })
      return { ...state, data }

    case t.WIDGET_MATCH_DESTROY_SUCCESS:
      data = state.data.map(widget => {
        if (widget.id === parseInt(action.payload.widget_id)) {
          widget.match_list = widget.match_list.filter(match => {
            return !action.payload.deleted_matches.includes(match.id)
          })
        }
        return widget
      })
      return { ...state, data }
  }
}
