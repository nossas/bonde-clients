/**
 * AdjustmentsForm
 *
 * Um componente para para submeter formulários de ajustes de widgets.
 */
import React from 'react'
import PropTypes from 'prop-types'
import {
  FormGroup,
  ControlLabel,
  FormControl,
  ColorPicker,
  HelpBlock
} from '~client/components/forms'
import { SettingsForm } from '~client/ux/components'

const AdjustmentsSettingsForm = (props) => {
  const {
    children,
    fields: {
      call_to_action: callToAction,
      button_text: buttonText,
      count_text: countText,
      main_color: mainColor
    },
    widget,
    asyncWidgetUpdate,
    // TODO: Remover essa dependencia da mobilização
    dispatch,
    colorScheme,
    ...formProps
  } = props
  return (
    <SettingsForm
      {...formProps}
      onSubmit={values => {
        const settings = widget.settings || {}

        return asyncWidgetUpdate({
          ...widget,
          settings: { ...settings, ...values }
        })
      }}
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
        <HelpBlock>O contador será mostrado se existir um texto definido.</HelpBlock>
      </FormGroup>
      <FormGroup controlId='main-color-id' {...mainColor}>
        <ControlLabel>Cor padrão</ControlLabel>
        <HelpBlock>
          Selecione a cor no box abaixo ou insira o valor em hex, por exemplo: #DC3DCE.
        </HelpBlock>
        <ColorPicker
          dispatch={dispatch}
          theme={colorScheme.replace('-scheme', '')}
        />
      </FormGroup>
      {children}
    </SettingsForm>
  )
}

AdjustmentsSettingsForm.propTypes = {
  // Injected by redux-form
  fields: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired,
  error: PropTypes.string,
  // Injected by widgets/models/ModelForm
  colorScheme: PropTypes.string,
  // Injected by container
  mobilization: PropTypes.object.isRequired,
  widget: PropTypes.object.isRequired,
  asyncWidgetUpdate: PropTypes.func.isRequired
}

export default AdjustmentsSettingsForm
