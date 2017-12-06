import { isValidEmail, isValidPhoneE164 } from '~client/utils/validation-helper'
import { fromJS } from 'immutable'

const getIn = (obj, path) => fromJS(obj).getIn(path.split('.'))

const setIn = (obj, path, value) => fromJS(obj).setIn(path.split('.'), value).toJS()

export const applyValidate = ({
  validate,
  message
}) => (fieldsOrField, customMessage) => (values, errorsCtx) => {
  let fields = fieldsOrField
  let errors = errorsCtx || {}
  if (typeof fieldsOrField === 'string') {
    fields = [fieldsOrField]
  }

  fields.map(fieldName => {
    if (validate(getIn(values, fieldName))) {
      const error = (getIn(errors, fieldName) || customMessage || message)
      errors = setIn(errors, fieldName, error)
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

export const isPhoneNumber = applyValidate({
  validate: (value) => !isValidPhoneE164(value),
  message: {
    id: 'createForm.validate.phoneNumber',
    defaultMessage: 'Formato de telefone inválido. Ex: +5511956781234'
  }
})

export const combineValidations = (validations) => (values) => {
  let errors = {}
  validations.map(fn => { errors = fn(values, errors) })
  return errors
}
