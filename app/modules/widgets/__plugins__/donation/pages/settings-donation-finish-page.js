import React, { PropTypes } from 'react'
import { reduxForm } from 'redux-form'

// Global module dependencies
import * as Paths from '../../../../../scripts/Paths'
import { TellAFriend } from '../../../../../scripts/components'
import {
  FormRedux,
  FormGroup,
  RadioGroup,
  Radio,
  ControlLabel
} from '../../../../../scripts/Dashboard/Forms'
import { SettingsPageLayout, SettingsPageContentLayout } from '../../../../../components/Layout'
import Editor from '../../../../../scripts/RebooEditor'
import ColorPicker from '../../../../../components/ColorPicker'

// Parent module dependencies
import {
  actions as WidgetActions
} from '../../../../../modules/widgets'

// Current module dependencies
import { SettingsMenu } from '../components'

const convertColorObjectToString = ({ rgba }) => {
  if (rgba.constructor !== Object) return rgba
  const { r, g, b, a } = rgba
  return `rgba(${r}, ${g}, ${b}, ${a})`
}

const SettingsDonationFinishPage = props => {
  const {
    fields: {
      finish_message_type: finishMessageType
    },
    mobilization,
    widget,
    finishMessage,
    dispatch,
    finishMessageBackground,
    ...rest
  } = props
  const { color_scheme: colorScheme } = mobilization

  const handleSubmit = values => {
    const { asyncWidgetUpdate, widget } = props
    asyncWidgetUpdate({
      ...widget,
      settings: { ...widget.settings, ...values }
    })
  }

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
          onSubmit={handleSubmit}
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
            <TellAFriend
              mobilization={mobilization}
              message={'Oba, doação registrada! Sua doação é via boleto? Verifique seu email.'}
              href={Paths.mobilization(mobilization)}
            />
          )}
          {finishMessageType.value === 'custom' && (
            <div className='widget-finish-message-custom'>
              <div className='relative'>
                <Editor
                  value={JSON.parse(finishMessage)}
                  theme={colorScheme.replace('-scheme', '')}
                  toolbarStyle={{ left: 0 }}
                  containerStyle={{ minHeight: 130 }}
                  focusStyle={{
                    border: '1px solid #51a7e8',
                    outline: 'none',
                    boxShadow: 'inset 0 1px 2px rgba(0,0,0,0.075), 0 0 5px rgba(81,167,232,0.5)',
                    top: 58
                  }}
                  editorStyle={{
                    borderRadius: 3,
                    backgroundColor: convertColorObjectToString({ rgba: finishMessageBackground }),
                    border: '1px solid #efefef'
                  }}
                  handleSave={rawContent => {
                    const { widget, asyncWidgetUpdate } = props
                    const settings = widget.settings || {}
                    asyncWidgetUpdate({
                      ...widget,
                      settings: {
                        ...settings,
                        finish_message: JSON.stringify(rawContent),
                        finish_message_type: finishMessageType.value
                      }
                    })
                  }}
                />
              </div>

              <label className='h5 darkengray caps my2 block'>Cor de fundo</label>
              <ColorPicker
                dispatch={dispatch}
                theme={colorScheme.replace('-scheme', '')}
                className='left'
                color={finishMessageBackground}
              />
            </div>
          )}
        </FormRedux>
      </SettingsPageContentLayout>
    </SettingsPageLayout>
  )
}

SettingsDonationFinishPage.propTypes = {
  fields: PropTypes.object.isRequired,
  submitting: PropTypes.bool.isRequired,
  error: PropTypes.string,

  mobilization: PropTypes.object.isRequired,
  widget: PropTypes.object.isRequired,
  // Actions
  asyncWidgetUpdate: PropTypes.func.isRequired
}

const fields = [
  'finish_message_type',
  'finish_message_background'
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
    finish_message_type: settings.finish_message_type || 'custom'
  },
  finishMessage: settings.finish_message || 'Clique aqui para editar...',
  finishMessageBackground: state.colorPicker.color ||
    settings.finish_message_background ||
    { r: 255, g: 255, b: 255, a: 255 }
})

export default reduxForm(
  { form: 'settingsDonationFinishPage', fields, validate },
  mapStateToProps,
  WidgetActions
)(SettingsDonationFinishPage)
