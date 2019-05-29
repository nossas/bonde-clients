export const register = (queryName) => dispatch => {
  dispatch({ type: 'Queryset/REGISTER', payload: queryName })
}

export const done = ({ queryName, length }) => dispatch => {
  dispatch({ type: 'Queryset/DONE', payload: { queryName, length } })
}

