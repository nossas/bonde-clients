import React, { Component, PropTypes } from 'react'
import reactMixin from 'react-mixin'
import { reduxForm } from 'redux-form'
import { Navigation } from 'react-router'

import * as MobilizationActions from '../MobilizationActions'
import * as Paths from '../../Paths'
import { InputCounter } from '../../components'
import {
  FormRedux,
  FormGroup,
  ControlLabel,
  FormControl
} from '../../Dashboard/Forms'

@reactMixin.decorate(Navigation)
export class MobilizationBasicsFormPage extends Component {
  render() {
    const {
      ...rest,
      fields: { name, goal },
      mobilization,
      // Actions
      editMobilizationAsync,
      addMobilizationAsync
    } = this.props

    const submitStrategy = mobilization ? editMobilizationAsync : addMobilizationAsync
    const next = mobilization ? undefined :
      mobilization => this.transitionTo(Paths.cityNewMobilization(mobilization.id))

    const handleSubmit = values => submitStrategy({ ...mobilization, ...values }, next)

    return (
      <div className="p3 lg-col-5 mx-auto">
        {(
          !!mobilization ? null :
          <h2 className="h1 mt0 mb3 center px5">Qual o objetivo da sua mobilização?</h2>
        )}
        <FormRedux onSubmit={handleSubmit} {...rest} className="bg-white">
          <FormGroup controlId="name" {...name}>
            <ControlLabel>
              Nome
              <InputCounter
                maxLength={100}
                length={name.value ? name.value.length : 0}
                classNames={['right', 'regular']}
              />
            </ControlLabel>
            <FormControl
              type="text"
              placeholder="Ex: Pela criação de uma delegacia de desaparecidos"
              maxLength={100}
            />
          </FormGroup>
          <FormGroup controlId="goal" {...goal}>
            <ControlLabel>
              Objetivo
              <InputCounter
                maxLength={500}
                length={goal.value ? goal.value.length : 0}
                classNames={['right', 'regular']}
              />
            </ControlLabel>
            <FormControl
              componentClass='textarea'
              placeholder={'Faça um texto curto, capaz de motivar outras pessoas a se unirem à'
                + ' sua mobilização. Você poderá alterar este texto depois.'}
              maxLength={500}
              rows="4"
            />
          </FormGroup>
        </FormRedux>

        {(
          !!mobilization ? null : (
            <p className="lightgray center" style={{ fontSize: '.9rem', marginTop: '1.5rem' }}>
              Fique tranquil@ vc poderá editar depois se achar necessário.
            </p>
          )
        )}
      </div>
    )
  }
}

MobilizationBasicsFormPage.propTypes = {
  fields: PropTypes.object.isRequired,
  mobilization: PropTypes.object.isRequired,
  // Actions
  editMobilizationAsync: PropTypes.func.isRequired,
  addMobilizationAsync: PropTypes.func.isRequired
}

const fields = ['name', 'goal']
const validate = values => {
  const errors = {}
  if (!values.name) {
    errors.name = 'Insira o nome da mobilização'
  } else if (values.name.length > 100) {
    errors.name = 'Seu título está muito longo!'
  }

  if (!values.goal) {
    errors.goal = 'Insira o objetivo da mobilização'
  } else if (values.goal.length > 500) {
    errors.goal = 'O limite de caracteres foi atingido.'
  }
  return errors
}
const mapStateToProps = (state, ownProps) => ({
  initialValues: ownProps.mobilization || { color_scheme: 'meurio-scheme' }
})

export default reduxForm({
  form: 'mobilizationForm',
  fields,
  validate
}, mapStateToProps, MobilizationActions)(MobilizationBasicsFormPage)
