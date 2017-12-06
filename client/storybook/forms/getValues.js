import { getValues } from 'redux-form'
import { fromJS } from 'immutable'
import { store } from '~client'

export default (formName, path) => {
  const values = getValues(store.getState().form[formName])
  return !path ? values : fromJS(values).getIn(path.split('.'))
}
