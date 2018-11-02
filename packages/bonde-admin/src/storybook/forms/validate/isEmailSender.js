import { isValidTargetEmail } from '@/utils/validation-helper'
import { applyValidate } from './applyValidate'

export const message = {
  id: 'createForm.validate.email',
  defaultMessage: 'Formato de email inválido'
}

export default applyValidate({
  validate: (value) => !isValidTargetEmail(value),
  message
})
