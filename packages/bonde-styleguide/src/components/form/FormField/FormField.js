import React from 'react'
import PropTypes from 'prop-types'
import ControlLabel from '../ControlLabel/ControlLabel'
import Flexbox from '../../layout/Flexbox/Flexbox'
import InputAdornment from '../InputAdornment/InputAdornment'
import InputHint from '../InputHint/InputHint'

/**
 * Full field component that composes ControlLabel, props.inputComponent,
 * InputHint and InputAdornment components.
 */
class FormField extends React.Component {
  render () {
    const {
      label,
      hint,
      placeholder,
      meta: { error, valid, touched, dirty },
      inputComponent: InputComponent,
      input,
      showValid,
      ...props
    } = this.props

    const adornmentProps = {}
    let showAdornment = false

    if (touched) {
      if (!!error) {
        adornmentProps.invalid = true
        showAdornment = true
      } else if (valid && showValid) {
        adornmentProps.valid = true
        showAdornment = true
      }
    }

    return (
      <div style={{ padding: '0 0 17px' }}>
        <Flexbox horizontal>
          <ControlLabel>{label}</ControlLabel>
          {(touched && error && typeof error === 'string') && <InputHint invalid={true}>{error}</InputHint>}
          {(hint && (!error || !touched)) && <InputHint>{hint}</InputHint>}
        </Flexbox>
        <Flexbox horizontal>
          <InputComponent
            fullWidth
            invalid={touched && !!error}
            valid={touched && valid}
            placeholder={placeholder}
            touched={touched}
            showValid={showValid}
            {...input}
            {...props}
          />
          {showAdornment && (<InputAdornment {...adornmentProps} />)}
        </Flexbox>
      </div>
    )
  }
}

FormField.propTypes = {
  /** Label text. */
  label: PropTypes.string.isRequired,
  meta: PropTypes.shape({
    /** Valid style. */
    valid: PropTypes.bool,
    /** Error text. The invalid input style is based on existence of this prop. */
    error: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.bool
    ]),
  }),
  /** Hint text. */
  hint: PropTypes.string,
  /** Placeholder text. */
  placeholder: PropTypes.string,
  /** Show valid theme in input when finish validation */
  showValid: PropTypes.bool
}

FormField.defaultProps = {
  meta: {},
  showValid: true
}

FormField.displayName = 'FormField'

/** @component */
export default FormField
