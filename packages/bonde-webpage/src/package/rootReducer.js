export const Types = {
  LOAD: 'webpage/LOAD'
}

const initialState = {
  meta: undefined,
  blocks: [],
  widgets: []
}

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case Types.LOAD:
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
