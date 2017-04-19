import React, { PropTypes } from 'react'
import { reduxForm } from 'redux-form'
import { FormGroup, ControlLabel, FormControl } from '~client/components/forms'
import * as validators from '~client/utils/redux-form/validators'

const CreditCardForm = ({
  FormComponent,
  fields: {
    id,
    token,
    creditcard,
    name,
    expiration,
    cvv
  },
  ...formProps
}) => (
  <div>
    <FormComponent
      {...formProps}
      buttonText='Salvar'
    >
      <input type='hidden' name='id' value={id.value} />
      <input type='hidden' name='token' value={token.value} />
      <p className='mb3 lightgray'>
        Altere os dados do seu cartão de crédito preenchendo o formulário abaixo. A sua assinatura
        permanecerá a mesma porém, à partir do momento que você salvar o formulário abaixo, o valor
        será cobrado no seu novo cartão.
      </p>

      <FormGroup className='mb2' controlId='creditcard' {...creditcard}>
        <ControlLabel>Número</ControlLabel>
        <FormControl
          type='text'
          placeholder='Ex: 0000 0000 0000 0000'
        />
      </FormGroup>

      <FormGroup className='mb2' controlId='name' {...name}>
        <ControlLabel>Nome</ControlLabel>
        <FormControl
          type='text'
          placeholder='(igual no cartão)'
        />
      </FormGroup>

      <div className='clearfix col-12 mb3'>
        <FormGroup className='col col-6' controlId='expiration' {...expiration}>
          <ControlLabel>Validade</ControlLabel>
          <FormControl
            type='text'
            placeholder='00/00'
          />
        </FormGroup>

        <FormGroup className='col col-4 ml3' controlId='cvv' {...cvv}>
          <ControlLabel>CVV</ControlLabel>
          <FormControl
            type='text'
            placeholder='Ex: 000'
          />
        </FormGroup>
      </div>
    </FormComponent>
  </div>
)

const fields = ['id', 'token', 'creditcard', 'name', 'expiration', 'cvv']

const abstractValidate = values => {
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

CreditCardForm.propTypes = {
  FormComponent: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.func
  ]).isRequired
}

export default ({ validate, mapStateToProps, mapDispatchToProps }) => reduxForm({
  form: 'subscriptionEditForm',
  fields,
  validate: validators.abstractValidate({ abstractValidate, validate })
}, mapStateToProps, mapDispatchToProps)(CreditCardForm)
