import { getValues } from 'redux-form'
import { store } from '~client'
import deepGet from './deepGet'

export default (formName, path) => {
  const values = getValues(store.getState().form[formName])
  return !path ? values : deepGet(values, path)
}
