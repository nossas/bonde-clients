import * as t from '../action-types'

export default () => dispatch => {
  dispatch({ type: t.UNSELECT })
}
