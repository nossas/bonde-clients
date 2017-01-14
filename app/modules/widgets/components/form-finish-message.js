import React, { PropTypes } from 'react'
import { reduxForm } from 'redux-form'

// Global module dependencies
import {
  FormRedux,
  FormGroup,
  RadioGroup,
  Radio,
  ControlLabel
} from '../../../scripts/Dashboard/Forms'
import { SettingsPageLayout, SettingsPageContentLayout } from '../../../components/Layout'
import Editor from '../../../scripts/RebooEditor'

// Current module dependencies
import * as styles from './form-finish-message.scss'
import * as WidgetActions from '../action-creators'

const FormFinishMessage = props => {
  const { mobilization, widget, fields, ...rest } = props
  const { color_scheme: colorScheme } = mobilization
  const { TellAFriend, SettingsMenu } = props

  const {
    finish_message_type: finishMessageType,
    finish_message: finishMessage
  } = fields

  return (
    <SettingsPageLayout>
      <SettingsMenu
        {...rest}
        mobilization={mobilization}
        widget={widget}
      />
      <SettingsPageContentLayout>
        <FormRedux
          {...rest}
          className='transparent'
          floatButton='Salvar'
          onSubmit={onSubmit(props)}
          successMessage='Formulário de doação configurado com sucesso!'
        >
          <FormGroup controlId='payment-type-id' {...finishMessageType}>
            <ControlLabel>Tipo de doação</ControlLabel>
            <RadioGroup>
              <Radio value='share'>Compartilhar</Radio>
              <Radio value='custom'>Customizado</Radio>
            </RadioGroup>
          </FormGroup>

          <label className='h5 darkengray caps mb1 block'>Preview</label>
          {finishMessageType.value === 'share' && (
            <TellAFriend mobilization={mobilization} />
          )}
          {finishMessageType.value === 'custom' && (
            <div className='widget-finish-message-custom'>
              <div className='relative'>
                <input type='hidden' name='finish_message' />
                <Editor
                  value={editorValue(finishMessage.value)}
                  theme={colorScheme.replace('-scheme', '')}
                  toolbarStyle={styles.editorToolbar}
                  containerStyle={styles.editorContainer}
                  focusStyle={styles.editorFocus}
                  editorStyle={styles.editor}
                  handleSave={rawContent => { finishMessage.onChange(JSON.stringify(rawContent)) }}
                />
              </div>
            </div>
          )}
        </FormRedux>
      </SettingsPageContentLayout>
    </SettingsPageLayout>
  )
}

//
// Helper functions
//
const onSubmit = props => values => {
  const { asyncWidgetUpdate, widget } = props
  return asyncWidgetUpdate({
    ...widget,
    settings: { ...widget.settings, ...values }
  })
}

const editorValue = message => {
  try {
    return JSON.parse(message)
  } catch (e) {
    return message
  }
}

//
// Redux Form configurations
//
const fields = [
  'finish_message_type',
  'finish_message'
]

const validate = values => {
  const errors = {}
  if (!values.finish_message_type) {
    errors.finish_message_type = 'Nenhum tipo de mensagem foi selecionado'
  }
  return errors
}

const mapStateToProps = (state, { widget: { settings } }) => ({
  initialValues: {
    finish_message_type: settings.finish_message_type || 'share',
    finish_message: settings.finish_message || 'Clique aqui para editar...'
  }
})

//
// PropTypes
//
FormFinishMessage.propTypes = {
  fields: PropTypes.object.isRequired,
  submitting: PropTypes.bool.isRequired,
  error: PropTypes.string,

  mobilization: PropTypes.object.isRequired,
  widget: PropTypes.object.isRequired,
  // Actions
  asyncWidgetUpdate: PropTypes.func.isRequired
}

export default reduxForm(
  { form: 'formFinishMessage', fields, validate },
  mapStateToProps,
  WidgetActions
)(FormFinishMessage)
