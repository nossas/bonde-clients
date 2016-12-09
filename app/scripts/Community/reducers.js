import * as t from './actionTypes'


const initialState = {
  isLoaded: false,
  data: [],
  currentId: undefined
}

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case t.FETCH:
      return {
        ...state,
        loading: true
      }
    case t.FETCH_SUCCESS:
      return {
        ...state,
        loading: false,
        isLoaded: true,
        data: action.data,
      }
    case t.FETCH_FAIL:
      return {
        ...state,
        loading: false,
        isLoaded: false,
        error: action.error
      }
    default:
      return state
  }
}
