import * as t from '../action-types'

export default id => dispatch => {
  dispatch({ type: t.SELECT, payload: id })
}
