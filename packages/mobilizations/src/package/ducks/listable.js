// Action types
export const Types = {
  LOAD: 'LOAD',
  CREATE: 'CREATE',
  UPDATE: 'UPDATE',
  REMOVE: 'REMOVE'
}

// Reducer
const initialState = {
  data: []
}

export default (state = initialState, action = {}) => {
  const { payload } = action
  
  switch (action.type) {
    case Types.LOAD:
      return { ...state, data: payload }
    case Types.CREATE:
      return { ...state, data: [payload, ...state.data] }
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
