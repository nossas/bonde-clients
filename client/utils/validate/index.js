import { isValidEmail } from '~client/utils/validation-helper'

const applyValidate = ({ validate, message }) => (fields) => (values, errorsCtx) => {
  const errors = errorsCtx || {}
  fields.map(fieldName => {
    if (validate(values[fieldName])) {
      errors[fieldName] = errors[fieldName] || message
    }
  })
  return errors
}

export const required = applyValidate({
  validate: (value) => !value,
  message: 'Required field.'
})

export const validateEmail = applyValidate({
  validate: (value) => !isValidEmail(value),
  message: 'Email isn\'t valid.'
})

export const validate = (validations) => (values) => {
  let errors = {}
  validations.map(fn => { errors = fn(values, errors) })
  return errors
}
