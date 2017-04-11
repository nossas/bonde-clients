import { reduxForm } from 'redux-form'

import Page from './page'

const fields = ['dummy']

const validate = values => {
  const errors = {}
  if (!values.dummy) {
    errors.dummy = 'Dummy data validation 😜'
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
