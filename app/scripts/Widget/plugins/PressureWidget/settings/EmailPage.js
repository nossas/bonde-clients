import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import reduxForm from 'redux-form'

import { editWidget } from '../../../actions'
import { Control, Input, Textarea } from '../../../components/FormUtils'

import { Base as PressureBase } from '../components/settings'


const EMAIL_TEXT_PLACEHOLDER = "Obrigado por apostar na força da ação coletiva em rede. Sua participação é muito importante e, agora, precisamos da sua ajuda para que mais gente colabore com esta mobilização.\nCompartilhe nas suas redes clicando em um dos links abaixo.\n\nUm abraço."


const widgetFormValidation = (data) => {
  const errors = { valid: true }
  if (!data.email_subject) {
    errors.email_subject = 'Insira um assunto para o e-mail'
    errors.valid = false
  }
  if (!data.email_text) {
    errors.email_text = 'Insira um corpo para o e-mail'
    errors.valid = false
  }
  if (!data.email_done) {
    errors.email_done = 'Insira uma mensagem de agradecimento para o e-mail'
    errors.valid = false
  }
  return errors
}

const mapStateToProps = state => (
  {
    form: state.widgetForm,
    saving: state.widgets.saving
  }
)

@connect(mapStateToProps, { editWidgetAction: editWidget })
@reduxForm('widgetForm', widgetFormValidation)
class EmailPage extends Component {

  constructor(props) {
    super(props)

    const { email_subject, email_text, email_done } = this.props.widget.settings

    this.props.initializeForm(
      {email_subject, email_text, email_done} || {
        email_subject: '',
        email_text: '',
        email_done: ''
      }
    )
  }

  handleSubmit(e) {
    e.preventDefault()
    const { data, valid, touchAll } = this.props      // redux form
    const { auth, mobilization, widget } = this.props // containers
    const { editWidgetAction } = this.props           // connect actions
    if (valid) {
      editWidgetAction({
        mobilization_id: mobilization.id,
        widget_id: widget.id,
        credentials: auth.credentials,
        widget: { settings: {
          ...widget.settings,
          ...data
        }}
      })
    } else {
      touchAll()
    }
  }

  render() {
    const {
      location, mobilization, widget, saving,
      data: { email_subject, email_text, email_done },
      ...inputProps
    } = this.props
    return (
      <PressureBase location={location} mobilization={mobilization} widget={widget}>
        <form onSubmit={::this.handleSubmit}>
          <Control id="email-subject-id" label="Assunto do email" name="email_subject" {...inputProps}>
            <Input type="text" value={email_subject} placeholder="Envie um e-mail para quem pode tomar essa decisão" />
          </Control>
          <Control id="email-subject-id" label="Corpo do email que será enviado para o alvo" name="email_text" {...inputProps}>
            <Textarea value={email_text} placeholder={EMAIL_TEXT_PLACEHOLDER} />
          </Control>
          <Control id="email-done-id" label="Email de autofire (Agradecimento de quem apoiou)" name="email_done" {...inputProps}>
            <Textarea value={email_done} placeholder={EMAIL_TEXT_PLACEHOLDER} />
          </Control>
          <div className="block">
            <button className="caps button bg-darken-3 h3 mt1 mr2">Cancelar</button>
            <input type="submit" className="caps button bg-aqua h3 mt1" disabled={saving} value={(saving ? "Enviando" : "Salvar")} />
          </div>
        </form>
      </PressureBase>
    )
  }
}

EmailPage.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string
  }).isRequired,
  mobilization: PropTypes.object.isRequired, // MobilizationDashboardContainer
  widget: PropTypes.object.isRequired, // MobilizationDashboardContainer
  auth: PropTypes.object.isRequired, // UserDashboardContainer
  saving: PropTypes.bool.isRequired, // connect redux
  editWidgetAction: PropTypes.func.isRequired,
  // Redux form
  data: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  handleBlur: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
  touchAll: PropTypes.func.isRequired,
  initializeForm: PropTypes.func.isRequired,
  valid: PropTypes.bool.isRequired
}

export default EmailPage
