// Action types
export const Types = {
  LOAD: 'LOAD',
  CREATE: 'CREATE',
  UPDATE: 'UPDATE',
  REMOVE: 'REMOVE',
  SELECT: 'SELECT'
}

// Reducer
const initialState = {
  data: [],
  selected: undefined
}

export default (state = initialState, action = {}) => {
  const { payload } = action
  
  switch (action.type) {
    case Types.LOAD:
      return { ...state, data: payload }
    case Types.CREATE:
      const exists = (
        state.data.findIndex(entry => entry.id === payload.id)
      ) !== -1
      if (!exists)
        return { ...state, data: [payload, ...state.data] }
      return state
    case Types.UPDATE:
      return {
        ...state,
        data: state.data.map(entry => entry.id === payload.id
          ?  {...entry, ...payload}
          : entry
        )
      } 
    case Types.REMOVE:
      return {
        ...state,
        data: state.data.filter(entry => entry.id !== payload.id)
      }
    case Types.SELECT:
      return { ...state, selected: action.payload }
    default:
      return state
  }
}

// Actions
export const load = (entries) => ({
  type: Types.LOAD, payload: entries
})

export const create = (entry) => ({
  type: Types.CREATE,
  payload: entry
})

export const update = (entry) => ({
  type: Types.UPDATE,
  payload: entry
})

export const remove = (entry) => ({
  type: Types.REMOVE,
  payload: entry
})

export const select = (id) => ({
  type: Types.SELECT,
  payload: id
})
