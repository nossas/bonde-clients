import * as t from './actionTypes'
import superagent from 'superagent'


/*export const fetch = (dispatch, getState) => ({
  types: [t.FETCH, t.FETCH_SUCCESS, t.FETCH_FAIL],
  promise: () => new Promise((resolve, reject) => {
    // TODO: Request API [GET] /communities
    const { auth: { credentials } } = getState()
    superagent
      .get('/communities')
      .set(credentials)
      .end((res, err) => {
        if (err || !res.ok) reject(err || res.body)
        else resolve(res.body)
      })
  })
})*/

export const fetch = credentials => dispatch => {
  dispatch({ type: t.FETCH })
  superagent
    .get(`${process.env.API_URL}/communities`)
    .set(credentials)
    .end((err, res) => {
      if (err || !res.ok) dispatch({ type: t.FETCH_FAIL, error: err || res.body })
      else dispatch({ type: t.FETCH_SUCCESS, data: res.body })
    })
}
