import React, { PropTypes, Component } from 'react'
import { reduxForm } from 'redux-form'
import { Navigation } from 'react-router'
import reactMixin from 'react-mixin'

import * as Paths from '../../../../Paths'
import * as MobilizationActions from '../../../MobilizationActions'
import { InputCounter } from '../../../../components'
import {
  FormRedux,
  FormGroup,
  ControlLabel,
  FormControl
} from '../../../../Dashboard/Forms'
import {
  MobilizationListItemAvatar,
  MobilizationListItemName
} from '../../../components'

@reactMixin.decorate(Navigation)
export class MobilizationTemplatesBasicsForm extends Component {
  render () {
    const {
      fields: { name, description },
      mobilization,
      // Actions
      addMobilizationAsync,
      editMobilizationAsync,
      ...rest
    } = this.props
    const submitStrategy = mobilization ? editMobilizationAsync : addMobilizationAsync
    const next = mobilization
      ? undefined
      : mobilization => this.transitionTo(Paths.cityNewMobilization(mobilization.id))

    const handleSubmit = values => submitStrategy({ ...mobilization, ...values }, next)

    return (
      <div
        className="lg-col-5 mx-auto mt3"
        style={{ whiteSpace: 'nowrap', overflow: 'hidden' }}
      >
        <div className="mobilization-list bg-white clearfix">
          <MobilizationListItemAvatar
            {...mobilization}
            imageSize={{ width: '100px', height: '100px' }}
          />
          <MobilizationListItemName
            {...mobilization}
            className="lg-col-8 darkengray"
            style={{ padding: 0, paddingTop: '20px', fontSize: '1.1rem' }}
          />
        </div>

        <div className="py3" style={{ textAlign: 'center' }}>
          <div className="arrow-down" />
        </div>

        <FormRedux {...rest} onSubmit={handleSubmit} className="bg-white ">
          <FormGroup controlId="name" {...name}>
            <ControlLabel>
              Nome do seu template
              <InputCounter
                maxLength={100}
                length={name.value ? name.value.length : 0}
                className="right regular"
              />
            </ControlLabel>
            <FormControl
              type="text"
              placeholder="Pela criação de uma delegacia de desaparecidos"
              maxLength={100}
            />
          </FormGroup>
          <FormGroup controlId="description" {...description}>
            <ControlLabel>
              Descrição
              <InputCounter
                maxLength={500}
                length={description.value ? description.value.length : 0}
                className="right regular"
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
      </div>
    )
  }
}

MobilizationTemplatesBasicsForm.propTypes = {
  fields: PropTypes.object.isRequired,
  mobilization: PropTypes.object,
  // Actions
  editMobilizationAsync: PropTypes.func.isRequired,
  addMobilizationAsync: PropTypes.func.isRequired
}

const fields = ['name', 'description']
const validate = values => {
  const errors = {}
  if (!values.name) {
    errors.name = 'Insira o nome da mobilização'
  } else if (values.name.length > 100) {
    errors.name = 'Seu título está muito longo!'
  }

  if (!values.description) {
    errors.description = 'Insira o objetivo da mobilização'
  } else if (values.description.length > 500) {
    errors.description = 'O limite de caracteres foi atingido.'
  }
  return errors
}
const mapStateToProps = (state, props) => ({
  initialValues: props.mobilization.template || {}
})

export default reduxForm({
  form: 'mobilizationTemplatesBasicsForm',
  fields,
  validate
}, mapStateToProps, MobilizationActions)(MobilizationTemplatesBasicsForm)
