import { fromJS } from 'immutable'
import { getValues } from 'redux-form'
import { configureStore as store } from '@/store'

export default (formName, path) => {
  const values = getValues(store.getState().form[formName])

  if (!values) return values

  return !path ? values : fromJS(values).getIn(path.split('.'))
}
