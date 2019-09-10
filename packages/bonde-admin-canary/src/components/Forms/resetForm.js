import { reset } from 'redux-form'
import { store } from 'services/redux'

export default (formId) => store.dispatch(reset(formId))
