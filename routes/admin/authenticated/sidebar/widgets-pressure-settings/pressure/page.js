import PropTypes from 'prop-types'
import React from 'react'
import { FormattedMessage, intlShape } from 'react-intl'
import {
  FormGroup,
  ControlLabel,
  FormControl,
  ColorPicker,
  RadioGroup,
  Radio
} from '~client/components/forms'
import { SettingsForm } from '~client/ux/components'

const PressureSettingsPage = ({
  fields: {
    title_text: titleText,
    button_text: buttonText,
    show_counter: showCounter,
    show_city: showCity,
    count_text: countText,
    main_color: mainColor
  },
  ...props
}) => {
  const handleSubmit = values => {
    const { widget, asyncWidgetUpdate } = props
    const settings = widget.settings || {}

    return asyncWidgetUpdate({
      ...widget,
      settings: { ...settings, ...values }
    })
  }

  const { intl } = props

  const {
    dispatch,
    mobilization: { color_scheme: colorScheme }
  } = props

  return (
    <SettingsForm
      {...props}
      onSubmit={handleSubmit}
      successMessage={
        <FormattedMessage
          id='page--pressure-widget.success-message'
          defaultMessage='Formulário de pressão configurado com sucesso!'
        />
      }
    >
      <FormGroup controlId='title-text-id' {...titleText}>
        <ControlLabel>
          <FormattedMessage
            id='page--pressure-widget.form.title-text.label'
            defaultMessage='Título do formulário'
          />
        </ControlLabel>
        <FormControl
          type='text'
          placeholder={
            intl.formatMessage({
              id: 'page--pressure-widget.form.title-text.placeholder',
              defaultMessage: 'Envie um e-mail para quem pode tomar essa decisão'
            })
          }
        />
      </FormGroup>
      <FormGroup controlId='button-text-id' {...buttonText}>
        <ControlLabel>
          <FormattedMessage
            id='page--pressure-widget.form.button-text.label'
            defaultMessage='Texto do botão'
          />
        </ControlLabel>
        <FormControl type='text'
          placeholder={
            intl.formatMessage({
              id: 'page--pressure-widget.form.button-text.placeholder',
              defaultMessage: 'Enviar e-mail'
            })
          }
        />
      </FormGroup>
      <FormGroup controlId='main-color-id' {...mainColor}>
        <ControlLabel>
          <FormattedMessage
            id='page--pressure-widget.form.main-color.label'
            defaultMessage='Cor do formulário'
          />
        </ControlLabel>
        <ColorPicker
          dispatch={dispatch}
          theme={colorScheme.replace('-scheme', '')}
        />
      </FormGroup>
      <FormGroup controlId='show-counter-id' {...showCounter}>
        <ControlLabel>
          <FormattedMessage
            id='page--pressure-widget.form.show-counter.label'
            defaultMessage='Mostrar contador de pressão'
          />
        </ControlLabel>
        <RadioGroup>
          <Radio value='true'>
            <FormattedMessage
              id='page--pressure-widget.form.show-counter.radio.yes.label'
              defaultMessage='Sim'
            />
          </Radio>
          <Radio value='false'>
            <FormattedMessage
              id='page--pressure-widget.form.show-counter.radio.no.label'
              defaultMessage='Não'
            />
          </Radio>
        </RadioGroup>
      </FormGroup>
      {(showCounter.value === 'true' ? (
        <FormGroup controlId='count-text-id' {...countText}>
          <ControlLabel>
            <FormattedMessage
              id='page--pressure-widget.form.counter-text.label'
              defaultMessage='Texto do contador'
            />
          </ControlLabel>
          <FormControl type='text'
            placeholder={
              intl.formatMessage({
                id: 'page--pressure-widget.form.counter-text.placeholder',
                defaultMessage: 'pressões feitas'
              })
            }
          />
        </FormGroup>
      ) : null)}
      <FormGroup controlId='show-city-field-id' {...showCity}>
        <ControlLabel>
          <FormattedMessage
            id='page--pressure-widget.form.show-city-field.label'
            defaultMessage='Mostrar campo de cidade'
          />
        </ControlLabel>
        <RadioGroup>
          <Radio value='city-true'>
            <FormattedMessage
              id='page--pressure-widget.form.show-city-field.radio.yes.label'
              defaultMessage='Sim'
            />
          </Radio>
          <Radio value='city-false'>
            <FormattedMessage
              id='page--pressure-widget.form.show-city-field.radio.no.label'
              defaultMessage='Não'
            />
          </Radio>
        </RadioGroup>
      </FormGroup>
    </SettingsForm>
  )
}

PressureSettingsPage.propTypes = {
  // Injected by container
  mobilization: PropTypes.object.isRequired,
  widget: PropTypes.object.isRequired,
  asyncWidgetUpdate: PropTypes.func.isRequired,
  // Injected by redux-form
  fields: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired,
  error: PropTypes.string,
  // translation
  intl: intlShape.isRequired
}

export default PressureSettingsPage
