const actionTypes = {
  REGISTER: 'Pagination/REGISTER'
}

const initialState = {
  offset: 0
}

export default (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.REGISTER:
      return { offset: action.payload }
    default:
      return state
  }
}
