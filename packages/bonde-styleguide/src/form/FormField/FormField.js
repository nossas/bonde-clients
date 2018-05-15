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
const FormField = ({
  label,
  hint,
  placeholder,
  meta: { error, valid, touched, dirty }, 
  inputComponent: InputComponent,
  input,
  ...props
}) => (
  <div style={{ padding: '0 0 17px' }}>
    <Flexbox horizontal>
      <ControlLabel>{label}</ControlLabel>
      {(touched && error) && <InputHint invalid={true}>{error}</InputHint>}
      {(hint && (!error || !touched)) && <InputHint>{hint}</InputHint>}
    </Flexbox>
    <Flexbox horizontal>
      <InputComponent
        fullWidth
        invalid={touched && !!error}
        valid={touched && valid}
        placeholder={placeholder}
        touched={touched}
        {...input}
        {...props}
      />
      {(touched && (!!error || valid)) && <InputAdornment invalid={!!error} valid={valid} />}
    </Flexbox>
  </div>
)

FormField.propTypes = {
  /** Label text. */
  label: PropTypes.string.isRequired,
  meta: PropTypes.shape({
    /** Valid style. */
    valid: PropTypes.bool,
    /** Error text. The invalid input style is based on existence of this prop. */
    error: PropTypes.string,
  }),
  /** Hint text. */
  hint: PropTypes.string, 
  /** Placeholder text. */
  placeholder: PropTypes.string
}

FormField.defaultProps = {
  meta: {}
}

FormField.displayName = 'FormField'

/* @component */
export default FormField
