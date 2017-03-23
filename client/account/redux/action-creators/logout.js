import { createAction } from './create-action'
import * as t from '../action-types'

export default () => (dispatch, getState, { auth }) => {
  return new Promise((resolve, reject) => {
    dispatch(createAction(t.LOGOUT_SUCCESS))
    resolve()
  })
}
