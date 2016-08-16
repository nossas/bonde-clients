import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import reduxForm from 'redux-form'

import { editWidget } from '../../../actions'
import { FormFooter, InputTag } from '../../../components'
import { Control, Input, Textarea } from '../../../components/FormUtils'

import { Base as PressureBase } from '../components/settings'


const EMAIL_TEXT_PLACEHOLDER = "Obrigado por apostar na força da ação coletiva em rede. Sua participação é muito importante e, agora, precisamos da sua ajuda para que mais gente colabore com esta mobilização.\nCompartilhe nas suas redes clicando em um dos links abaixo.\n\nUm abraço."

// Regex to validate Target (Ex.: Igor Santos <igor@nossascidades.org>)
const patternTarget = /[\w ]+<(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))>/

const widgetFormValidation = (data) => {
  const errors = { valid: true }
  if (!data.pressure_subject) {
    errors.pressure_subject = 'Insira um assunto para o e-mail'
    errors.valid = false
  }
  if (!data.pressure_body) {
    errors.pressure_body = 'Insira um corpo para o e-mail'
    errors.valid = false
  }
  return errors
}

const mapStateToProps = state => (
  {
    form: state.widgetForm,
    saving: state.widgets.saving,
    requestError: state.widgets.error
  }
)

@connect(mapStateToProps, { editWidgetAction: editWidget })
@reduxForm('widgetForm', widgetFormValidation)
class EmailPage extends Component {

  constructor(props) {
    super(props)

    this.state = { submitted: false, tags: [] }

    const { pressure_subject, pressure_body } = this.props.widget.settings || {
      pressure_subject: '',
      pressure_body: ''
    }

    this.props.initializeForm({ pressure_subject, pressure_body })
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.saving && nextProps.saving && !nextProps.requestError) {
      this.setState({ submitted: true })
    }
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
      data: { pressure_subject, pressure_body },
      ...inputProps
    } = this.props
    return (
      <PressureBase location={location} mobilization={mobilization} widget={widget}>
        <form onSubmit={::this.handleSubmit}>
          <InputTag
            label="Alvos"
            values={this.state.tags}
            onInsertTag={value => this.setState({ tags: [...this.state.tags, value] })}
            onRemoveTag={value => this.setState({ tags: this.state.tags.filter(tag => tag !== value) })}
            validate={value => {
              const errors = { valid: true }
              if (!value.match(patternTarget)) {
                errors.valid = false
                errors.message = 'Alvo fora do formato padrão. Ex.: Nome do alvo <alvo@provedor.com>'
              }
              return errors
            }}
          />
          <Control id="email-subject-id" label="Assunto do email" name="pressure_subject" {...inputProps}>
            <Input type="text" value={pressure_subject} placeholder="Envie um e-mail para quem pode tomar essa decisão" />
          </Control>
          <Control id="email-subject-id" label="Corpo do email que será enviado para o alvo" name="pressure_body" {...inputProps}>
            <Textarea value={pressure_body} placeholder={EMAIL_TEXT_PLACEHOLDER} />
          </Control>
          <FormFooter submitted={this.state.submitted} saving={saving} />
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
