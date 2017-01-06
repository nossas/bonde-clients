import * as t from '../action-types'

export default ({ id, ...mobilization }) => (dispatch, getState, axios) => {
  const { auth: { credentials } } = getState()

  return axios
    .put(`/mobilizations/${id}`, { mobilization }, { headers: credentials })
    .then(({ status, data }) => {
      debugger
      if (status === 200) {
        dispatch({ type: t.UPDATE, payload: data })
        return Promise.resolve()
      } else {
        return Promise.reject({ error: `Response code ${status}` })
      }
    })
    .catch(error => console.error('AsyncRequestError', error))
}
