export const Types = {
  SELECT_PAGE: 'webpage/SELECT_PAGE'
}

const initialState = {
  meta: undefined,
  blocks: [],
  widgets: []
}

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case Types.SELECT_PAGE:
      return {
        ...state,
        meta: action.payload.meta,
        blocks: action.payload.blocks,
        widgets: action.payload.widgets
      }
    default:
      return state
  }
}
