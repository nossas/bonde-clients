// TODO: Refactor auto fire, because this is used more Widget settings
import React, { PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { reduxForm } from 'redux-form'
import classnames from 'classnames'

import * as Paths from '../../Paths'
import * as WidgetActions from '../actions'
import { DonationWidgetMenu, Loading, CloseButton } from '../../components'
import { Menu as FormWidgetMenu } from '../plugins/Form/components'
import { Menu as PressureWidgetMenu } from '../plugins/PressureWidget/components/settings'

import * as validator from '../../../util/validation-helper'
import {
  FormRedux,
  FormGroup,
  ControlLabel,
  FormControl
} from '../../Dashboard/Forms'

class AutoFireForm extends React.Component {

  constructor (props, context) {
    super(props, context)
    this.state = {
      initializing: true,
      submitting: false,
      hasSubmitted: false
    }
  }

  componentWillReceiveProps(nextProps) {
    const widget = this.widget(nextProps)
    if (widget) {
      if (this.state.initializing) {
        const {
          sender_name: senderName,
          sender_email: senderEmail,
          email_subject: emailSubject,
          email_text: emailText
        } = (
          widget.settings ||
          {
            sender_name: null,
            sender_email: null,
            email_subject: null,
            email_text: null
          }
        )
        this.setState({initializing: false})
      }
      this.state.submitting && this.setState({submitting: false})
      this.state.submitting && this.setState({hasSubmitted: true})
    }
  }

  widget (props = this.props) {
    const { widgets } = props
    return widgets.data[widgets.data.map((widget) => { return widget.id.toString() }).indexOf(this.props.params.widget_id)]
  }

  handleCancelClick(event) {
    event.preventDefault()
    this.goBack()
  }

  handleSubmit(event) {
    event.preventDefault()
    const widget = this.widget()
    const { settings } = widget
    const { data, touchAll, valid, dispatch, mobilization, auth } = this.props
    this.setState({ submitting: true, hasSubmitted: false })
    if (valid) {
      const bindedWidgetActions = bindActionCreators(WidgetActions, dispatch)
      bindedWidgetActions.editWidget({
        mobilization_id: mobilization.id,
        widget_id: widget.id,
        credentials: auth.credentials,
        widget: { settings: {
          ...settings,
          sender_name: data.senderName,
          sender_email: data.senderEmail,
          email_subject: data.emailSubject,
          email_text: data.emailText
        } }
      })
    } else {
      touchAll()
      this.setState({ submitting: false })
    }
  }

  renderForm () {
    // <form onSubmit={::this.handleSubmit}>
    //
    //   { this.state.hasSubmitted && !dirty &&
    //   <div className="green mt2">Configurações do formulário atualizadas!</div> }
    // </form>
    const {
      fields: {
        sender_name: senderName,
        sender_email: senderEmail,
        email_subject: emailSubject,
        email_text: emailText
      },
      ...props
    } = this.props

    return (
      <FormRedux onSubmit={::this.handleSubmit} {...props}>
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
    )
  }

  renderPage () {
    const { widgets, dirty } = this.props
    const widget = this.widget()

    return (
      <div className='flex-auto flex flex-column bg-silver gray relative'>
        {/* TODO: Render menu */}
        {(widget.kind === 'donation'
          ? <DonationWidgetMenu {...this.props} widget={widget} />
          : widget.kind === 'pressure'
          ? <PressureWidgetMenu mobilization_id={this.props.mobilization.id} widget_id={widget.id} {...this.props} />
          : <FormWidgetMenu {...this.props} widget={widget} />
        )}
        <div className='p3 flex-auto overflow-scroll'>
          { !this.state.initializing && this.renderForm() }
        </div>
        <CloseButton dirty={dirty} path={Paths.editMobilization(this.props.mobilization.id)} />
      </div>
    )
  }

  renderLoading () {
    return (
      <Loading />
    )
  }

  render () {
    return (this.props.widgets.data.length > 0 ? this.renderPage() : this.renderLoading())
  }
}

AutoFireForm.propTypes = {
  fields: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired,

  dirty: PropTypes.bool.isRequired
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
(state, ownProps) => {
  return {
    initialValues: ownProps.widget.settings || {}
  }
})(AutoFireForm)
