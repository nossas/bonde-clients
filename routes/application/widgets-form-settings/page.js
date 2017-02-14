import React, { PropTypes } from 'react'

// Global module dependencies
import { SettingsPageContentLayout } from '~components/layout'
import {
  FormRedux,
  FormGroup,
  ControlLabel,
  FormControl
} from '~components/forms'

// Current module dependencies
import { SettingsMenu } from '~widget-plugins/form/components'

const WidgetsFormSettingsPage = ({
  fields: {
    call_to_action: callToAction,
    button_text: buttonText,
    count_text: countText
  },
  ...rest
}) => (
  <div className='flex-auto flex flex-column bg-silver atomic relative'>
    <SettingsMenu mobilization={rest.mobilization} widget={rest.widget} location={rest.location} />
    <SettingsPageContentLayout>
      <FormRedux
        {...rest}
        onSubmit={values => {
          const { widget, asyncWidgetUpdate } = rest
          const settings = widget.settings || {}

          return asyncWidgetUpdate({
            ...widget,
            settings: { ...settings, ...values }
          })
        }}
        className='transparent'
        floatButton='Salvar'
        successMessage='Formulário configurado com sucesso!'
      >
        <FormGroup controlId='call-to-action-id' {...callToAction}>
          <ControlLabel>Título do formulário</ControlLabel>
          <FormControl
            type='text'
            placeholder='Ex: Preencha o formulário abaixo para assinar a petição.'
          />
        </FormGroup>
        <FormGroup controlId='button-text-id' {...buttonText}>
          <ControlLabel>Botão</ControlLabel>
          <FormControl
            type='text'
            placeholder='Defina o texto do botão de confirmação do formulário.'
          />
        </FormGroup>
        <FormGroup controlId='count-text-id' {...countText}>
          <ControlLabel>Contador</ControlLabel>
          <FormControl
            type='text'
            placeholder='Defina o texto que ficará ao lado do número de pessoas que agiram.'
          />
        </FormGroup>
      </FormRedux>
    </SettingsPageContentLayout>
  </div>
)

WidgetsFormSettingsPage.propTypes = {
  fields: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired,
  error: PropTypes.string,
  mobilization: PropTypes.object.isRequired,
  widget: PropTypes.object.isRequired,
  // Actions
  asyncWidgetUpdate: PropTypes.func.isRequired
}

export default WidgetsFormSettingsPage
