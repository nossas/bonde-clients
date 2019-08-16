import { reset } from 'redux-form'
import { store } from 'services/redux'

export default (formName) => store.dispatch(reset(formName))
