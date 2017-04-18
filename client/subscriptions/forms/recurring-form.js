import React, { PropTypes } from 'react'
import { reduxForm } from 'redux-form'
import { FormGroup, ControlLabel, FormControl } from '~client/components/forms'
import { Pagarme } from '~client/components/external-services'
import * as validators from '~client/utils/redux-form/validators'

const RecurringForm = ({
  FormComponent,
  fields: {
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

const fields = ['process_at']

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

export default ({ validate, mapStateToProps, mapDispatchToProps }) => reduxForm({
  form: 'subscriptionEditForm',
  fields,
  validate: validators.abstractValidate({ abstractValidate, validate })
}, mapStateToProps, mapDispatchToProps)(RecurringForm)
