import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import reduxForm from 'redux-form'

import { editWidget } from '../../../actions'
import { Control, Input, RadioButton, ColorInput } from '../../../components/FormUtils'

import { Base as PressureBase } from '../components/settings'


const widgetFormValidation = (data) => {
  const errors = { valid: true }
  if (!data.title_text) {
    errors.title_text = 'Insira um título para o formulário'
    errors.valid = false
  }
  if (!data.button_text) {
    errors.button_text = 'Insira um texto para o botão'
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
class FormPage extends Component {

  constructor(props, context) {
    super(props, context)

    const { title_text, button_text, show_counter, main_color } = this.props.widget.settings

    this.props.initializeForm(
      {title_text, button_text, show_counter, main_color} || {
        title_text: '',
        button_text: '',
        show_counter: 'false',
        main_color: '#f23392'
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
      children, location, mobilization, widget, saving,
      data: { title_text, button_text, show_counter, main_color },
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
          <Control label="Mostrar contador de pessão" name='show_counter' {...inputProps}>
            <Input type="radio" value={show_counter}>
              <RadioButton className="mr1 caps" value="true">Sim</RadioButton>
              <RadioButton value="false" className="caps">Não</RadioButton>
            </Input>
          </Control>
          <div className="sm-col sm-col-10">
            <button className="caps button bg-darken-3 h3 mt1 mr2">Cancelar</button>
            <input type="submit" className="caps button bg-aqua h3 mt1" disabled={saving} value={(saving ? "Enviando" : "Salvar")} />
          </div>
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
  data: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  handleBlur: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
  touchAll: PropTypes.func.isRequired,
  initializeForm: PropTypes.func.isRequired,
  valid: PropTypes.bool.isRequired
}

export default FormPage
