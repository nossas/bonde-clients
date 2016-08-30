import React, { PropTypes, Component } from 'react'
import { reduxForm } from 'redux-form'

//
// TODO: The DonationWidgetMenu needs to be refactored to modularized structure.
// This is required to "abstract" the strategy of which Menu is needs to be shown.
// And remove the conditions in lines between 48 and 53. May be isolate it in container.
//
import { Loading } from '../../components'
import { Menu as FormWidgetMenu } from '../plugins/Form/components'
import { Menu as PressureWidgetMenu } from '../plugins/PressureWidget/components/settings'
import { Menu as DonationWidgetMenu } from '../plugins/Donation/components/settings'

import * as validator from '../../../util/validation-helper'
import * as WidgetActions from '../actions'
import {
  FormRedux,
  FormGroup,
  ControlLabel,
  FormControl
} from '../../Dashboard/Forms'

const AutoFireFormPage = (props) => {
  const {
    ...rest,
    fields: {
      sender_name: senderName,
      sender_email: senderEmail,
      email_subject: emailSubject,
      email_text: emailText
    },
    widgets,
    widget,
    mobilization,
    credentials,
    editWidget
  } = props

  const handleSubmit = (values, dispatch) => {
    const settings = widget.settings || {}
    const data = { ...widget, settings: { ...settings, ...values } }
    const params = { credentials, mobilization_id: mobilization.id }
    return dispatch(editWidget(data, params))
  }

  return (
    widgets.data.length > 0 ?
    <div>
      {(widget.kind === 'donation'
        ? <DonationWidgetMenu {...props} widget={widget} />
        : widget.kind === 'pressure'
        ? <PressureWidgetMenu mobilization_id={mobilization.id} widget_id={widget.id} {...props} />
      : <FormWidgetMenu {...props} widget={widget} />
      )}
      <div className='p3 flex-auto overflow-scroll'>
        <FormRedux onSubmit={handleSubmit} {...rest}>
          <FormGroup controlId="senderName" {...senderName}>
            <ControlLabel>Nome do remetente</ControlLabel>
            <FormControl
              type="text"
              placeholder="Defina o nome que irá aparecer na mensagem enviada."
            />
          </FormGroup>
          <FormGroup controlId="senderEmail" {...senderEmail}>
            <ControlLabel>E-mail remetente</ControlLabel>
            <FormControl
              type="text"
              placeholder="Defina o e-mail que irá aparecer na mensagem enviada."
            />
          </FormGroup>
          <FormGroup controlId="emailSubject" {...emailSubject}>
            <ControlLabel>Assunto do e-mail</ControlLabel>
            <FormControl
              type="text"
              placeholder="Defina o assunto que irá aparecer na mensagem enviada."
            />
          </FormGroup>
          <FormGroup controlId="emailText" {...emailText}>
            <ControlLabel>Email de agradecimento</ControlLabel>
            <FormControl
              componentClass="textarea"
              placeholder={'Ex: Obrigado por apostar na força da ação coletiva em rede. Sua'
                + ' participação é muito importante e, agora, precisamos da sua ajuda para que mais'
                + ' gente colabore com esta mobilização. Compartilhe nas suas redes clicando em um'
                + ' dos links abaixo. Um abraço.'}
            />
          </FormGroup>
        </FormRedux>
      </div>
    </div> :
    <Loading />
  )
}

AutoFireFormPage.propTypes = {
  fields: PropTypes.object.isRequired
}

const fields = ['sender_name', 'sender_email', 'email_subject', 'email_text']

const validate = values => {
  const errors = {}
  if (values.id && !/(UA|YT|MO)-\d+-\d+/i.test(values.id)) {
    errors.id = 'Informe uma ID válida'
  }
  if (!validator.isValidEmail(values.sender_email)) {
    errors.sender_email = 'Informe um e-mail inválido'
  }
  return errors
}

export default reduxForm({
  form: 'widgetForm',
  fields,
  validate
},
(state, ownProps) => ({
  initialValues: ownProps.widget.settings || {}
}), { ...WidgetActions })(AutoFireFormPage)
