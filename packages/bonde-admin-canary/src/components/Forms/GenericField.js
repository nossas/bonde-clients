import React from 'react'
import PropTypes from 'prop-types'
import {
  ControlLabel,
  Flexbox2 as Flexbox,
  Spacing,
  InputHint
} from 'bonde-styleguide'

/**
  * GenericField
  *
  * Render a base FormField component, responsible by render hint, errors,
  * warnings and label of a input field.
  */
const GenericField = ({ meta, input, inputComponent: InputComponent, label, hint, ...rest }) => {
  const { touched, error, valid } = meta
  // Manipulate any props on case input should render validations attrs
  const inputProps = {
    ...rest,
    ...input,
    touched,
    invalid: touched && !!error,
    valid: touched && valid
  }
  return (
    <Spacing padding={{ bottom: 17 }}>
      {/* Render Label, Error and Warning */}
      <Flexbox horizontal>
        {label && <ControlLabel>{label}</ControlLabel>}
        {(touched && error && typeof error === 'string') && <InputHint invalid>{error}</InputHint>}
        {(hint && (!error || !touched)) && <InputHint>{hint}</InputHint>}
      </Flexbox>
      <InputComponent {...inputProps} />
    </Spacing>
  )
}

const { any, object, string } = PropTypes

GenericField.propTypes = {
  /** Field meta props received by redux-form. */
  meta: object,
  /** Field input props received by redux-form. */
  input: object,
  /** Component used to render input field. */
  inputComponent: any,
  /** Label text. */
  label: string,
  /** Hint text. */
  hint: string
}

export default GenericField
