import React, { PropTypes } from 'react'
import { reduxForm } from 'redux-form'
import { FormGroup, ControlLabel, FormControl } from '~client/components/forms'
import { Pagarme } from '~client/components/external-services'
import * as validators from '~client/utils/redux-form/validators'
import * as normalizers from '~client/utils/redux-form/normalizers'

const RecurringForm = ({
  FormComponent,
  fields: {
    id,
    token,
    process_at: processAt
  },
  ...formProps
}) => (
  <div>
    <Pagarme />
    <FormComponent
      {...formProps}
      buttonText='Salvar'
    >
      <input type='hidden' name='id' value={id.value} />
      <input type='hidden' name='token' value={token.value} />
      <p className='mb3 lightgray'>
        Altere a data da sua doação preenchendo o formulário abaixo. A sua assinatura
        permanecerá a mesma porém, à partir do momento em que você salvar o formulário abaixo,
        a data da sua doação será a que você definir.
      </p>

      <FormGroup className='mb2' controlId='processAt' {...processAt}>
        <ControlLabel>Nova data da doação</ControlLabel>
        <FormControl
          type='text'
          placeholder='Ex: DD/MM/AAAA'
        />
      </FormGroup>
    </FormComponent>
  </div>
)

const fields = ['id', 'token', 'process_at']

const abstractValidate = values => {
  const errors = {}
  if (!values.process_at) {
    errors.process_at = 'Obrigatório'
  }
  return errors
}

RecurringForm.propTypes = {
  FormComponent: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.func
  ]).isRequired
}

export const normalizer = {
  process_at: normalizers.date.ddmmyyyy
}

export default ({ validate, mapStateToProps, mapDispatchToProps }) => reduxForm({
  form: 'recurringForm',
  fields,
  validate: validators.abstractValidate({ abstractValidate, validate })
}, mapStateToProps, mapDispatchToProps)(RecurringForm)
