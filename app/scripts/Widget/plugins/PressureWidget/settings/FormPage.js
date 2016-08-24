import React, { Component, PropTypes } from 'react'
import { reduxForm } from 'redux-form'

import { editWidget } from '../../../actions'
import { FormFooter } from '../../../components'
import { Control, Input, RadioButton, ColorInput } from '../../../components/FormUtils'

import { Base as PressureBase } from '../components/settings'


class FormPage extends Component {

  constructor(props, context) {
    super(props, context)

    this.state = {
      submitted: false,
    }

    const { title_text, button_text, show_counter, count_text, main_color } = this.props.widget.settings || {
      title_text: '',
      button_text: '',
      show_counter: 'false',
      count_text: 'pressões feitas',
      main_color: '#f23392'
    }

    this.props.initializeForm({ title_text, button_text, show_counter, count_text, main_color })
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.saving && !nextProps.saving && !nextProps.requestError) {
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
      children, location, mobilization, widget, saving,
      data: { title_text, button_text, show_counter, count_text, main_color },
      ...inputProps
    } = this.props

    return (
      <PressureBase location={location} mobilization={mobilization} widget={widget}>
        <form onSubmit={::this.handleSubmit}>
          <Control id="title-text-id" label="Título do formulário" name="title_text" {...inputProps}>
            <Input type="text" value={title_text} placeholder="Envie um e-mail para quem pode tomar essa decisão" />
          </Control>
          <Control id="button-text-id" label="Texto do botão" name='button_text' {...inputProps}>
            <Input type="text" value={button_text} placeholder='Enviar e-mail' />
          </Control>
          <Control id="main-color-id" label="Cor do formulário" name="main_color" {...inputProps}>
            <ColorInput value={main_color} />
          </Control>
          <Control label="Mostrar contador de pressão" name='show_counter' {...inputProps}>
            <Input type="radio" value={show_counter}>
              <RadioButton className="mr1 caps" value="true">Sim</RadioButton>
              <RadioButton value="false" className="caps">Não</RadioButton>
            </Input>
          </Control>
          {(show_counter === 'true' ? (
            <Control label="Texto do contador" name="count_text" {...inputProps}>
              <Input type="text" value={count_text} placeholder="pressões feitas" />
            </Control>
          ) : null)}
          <FormFooter submitted={this.state.submitted} saving={saving} />
        </form>
      </PressureBase>
    )
  }
}

FormPage.propTypes = {
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

const fields = ['title_text', 'button_text', 'show_counter', 'count_text', 'main_color']

const validate = values => {
  const errors = {}
  if (!values.title_text || values.title_text === "") {
    errors.title_text = 'Insira um título para o formulário'
  }
  if (!values.button_text) {
    errors.button_text = 'Insira um texto para o botão'
  }
  return errors
}

export default reduxForm({
  form: 'widgetForm',
  fields,
  validate
},
(state, ownProps) => ({
  initialValues: {
    show_counter: 'false',
    count_text: 'pressões feitas',
    main_color: '#f23392',
    ...ownProps.widget.settings || {}
  },
  form: state.widgetForm,
  saving: state.widgets.saving,
  requestError: state.widgets.error
}), { editWidget })(FormPage)
