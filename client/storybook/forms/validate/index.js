import { isValidEmail } from '~client/utils/validation-helper'

const applyValidate = ({
  validate,
  message
}) => (fieldsOrField, customMessage) => (values, errorsCtx) => {
  let fields = fieldsOrField
  const errors = errorsCtx || {}
  if (typeof fieldsOrField === 'string') {
    fields = [fieldsOrField]
  }

  fields.map(fieldName => {
    if (validate(values[fieldName])) {
      errors[fieldName] = errors[fieldName] || customMessage || message
    }
  })
  return errors
}

export const required = applyValidate({
  validate: (value) => !value,
  message: {
    id: 'createForm.validate.required',
    defaultMessage: 'Preenchimento obrigatório'
  }
})

export const isEmail = applyValidate({
  validate: (value) => !isValidEmail(value),
  message: {
    id: 'createForm.validate.email',
    defaultMessage: 'Informe um e-mail válido'
  }
})

export const combineValidations = (validations) => (values) => {
  let errors = {}
  validations.map(fn => { errors = fn(values, errors) })
  return errors
}
