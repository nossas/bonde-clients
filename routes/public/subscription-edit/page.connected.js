import { reduxForm } from 'redux-form'

import Page from './page'

const fields = ['creditcard', 'name', 'expiration', 'cvv']

const validate = values => {
  const errors = {}
  if (!values.creditcard) {
    errors.creditcard = 'Obrigatório'
  }
  if (!values.name) {
    errors.name = 'Obrigatório'
  }
  if (!values.expiration) {
    errors.expiration = 'Obrigatório'
  }
  if (!values.cvv) {
    errors.cvv = 'Obrigatório'
  }
  return errors
}

export default reduxForm(
  { form: 'subscriptionEditForm', fields, validate },
  undefined,
  { submit: values => (dispatch, getState, { api }) => {
    console.log('[routes/public/subscription-edit/page.connected.js] values', values)
  }}
)(Page)
