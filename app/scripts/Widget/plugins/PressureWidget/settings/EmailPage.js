import React, { Component, PropTypes } from 'react'
import { reduxForm } from 'redux-form'

import { editWidget } from '../../../actions'
import { FormFooter, InputTag } from '../../../components'
import { Control, Input, Textarea } from '../../../components/FormUtils'

import { Base as PressureBase } from '../components/settings'


// Regex to validate Target (Ex.: Igor Santos <igor@nossascidades.org>)
const patternTarget = /[\w]+[ ]*<(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))>/

class EmailPage extends Component {

  constructor(props) {
    super(props)

    this.state = { submitted: false, targets: this.getTargetList() || [] }

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

  getTargetString() {
    const { targets } = this.state
    return targets.join(';')
  }

  handleSubmit(e) {
    e.preventDefault()
    const { data, valid, touchAll } = this.props      // redux form
    const { auth, mobilization, widget } = this.props // containers
    const { editWidgetAction } = this.props           // connect actions
    if (valid) {
      const targets = this.getTargetString()
      editWidgetAction({
        mobilization_id: mobilization.id,
        widget_id: widget.id,
        credentials: auth.credentials,
        widget: { settings: {
          ...widget.settings,
          ...data,
          targets
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
    const { handleChange } = this.props
    return (
      <PressureBase location={location} mobilization={mobilization} widget={widget}>
        <form onSubmit={::this.handleSubmit}>
          <InputTag
            label="Alvos"
            values={this.state.targets}
            onInsertTag={value => this.setState({ targets: [...this.state.targets, value] })}
            onRemoveTag={value => this.setState({ targets: this.state.targets.filter(tag => tag !== value) })}
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
            <Input type="text" value={pressure_subject} />
          </Control>
          <Control id="email-body-id" label="Corpo do email que será enviado" name="pressure_body" {...inputProps}>
            <Textarea value={pressure_body} />
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
  fields: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired
}

const fields = ['pressure_subject', 'pressure_body', 'targets']

const validate = values => {
  const errors = {}
  if (!values.pressure_subject) {
    errors.pressure_subject = 'Preenchimento obrigatório'
  }
  if (!values.pressure_body) {
    errors.pressure_body = 'Preenchimento obrigatório'
  }
  return errors
}

const parseTargetList = (targets = '') => targets.split(';')

export default reduxForm({
  form: 'widgetForm',
  fields,
  validate
},
(state, ownProps) => ({
  initialValues: {
    ...ownProps.widget.settings || {},
    targets: parseTargetList(ownProps.widget.settings && ownProps.widget.settings.targets)
  },
  form: state.widgetForm,
  saving: state.widgets.saving,
  requestError: state.widgets.error
}), { editWidget })(EmailPage)
