import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import reduxForm from 'redux-form'

import { editWidget } from '../../../actions'
import { Control, Input, RadioButton } from '../../../components/FormUtils'

import SettingsMenu from './SettingsMenu'

const widgetFormValidation = (data) => {
  const errors = { valid: true }
  if (!data.form_title) {
    errors.formTitle = 'Insira um título para o formulário'
  }
  return errors
}

@connect(state => ({ form: state.widgetForm }), { editWidgetAction: editWidget })
@reduxForm('widgetForm', widgetFormValidation)
class FormPage extends Component {

  constructor(props, context) {
    super(props, context)

    this.props.initializeForm(
      {
        form_title: '',
        button_text: '',
        show_counter: 'false',
      }
    )
  }

  render() {

    const {
      children, location, mobilization, widget,
      data: { form_title, button_text, show_counter },
      ...inputProps
    } = this.props

    return (
      <div className="widget settings">
        <SettingsMenu
          location={location}
          mobilization_id={mobilization.id}
          widget_id={widget.id} />
        <form className="p3 clearfix">
          <Control id="form-title-id" label="Título do formulário" name="form_title" {...inputProps}>
            <Input type="text" value={form_title} placeholder="Envie um e-mail para quem pode tomar essa decisão" />
          </Control>
          <Control id="button-text-id" label="Texto do botão" name='button_text' {...inputProps}>
            <Input type="text" value={button_text} placeholder='Enviar e-mail' />
          </Control>
          <Control label="Mostrar contador de pessão" name='show_counter' {...inputProps}>
            <Input type="radio" value={show_counter}>
              <RadioButton className="mr1 caps" value="true">Sim</RadioButton>
              <RadioButton value="false" className="caps">Não</RadioButton>
            </Input>
          </Control>
          {/**/}
        </form>
      </div>
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
