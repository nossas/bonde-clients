import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import ControlLabel from '../ControlLabel/ControlLabel'
import Input from '../Input/Input'
import Flexbox from '../../layout/Flexbox/Flexbox'
import InputAdornment from '../InputAdornment/InputAdornment'
import InputHint from '../InputHint/InputHint'

/**
 * Full text field component that composes ControlLabel, Input,
 * InputHint and InputAdornment components.
 */
const TextField = ({ label, valid, hint, error, placeholder }) => (
  <div>
    <Flexbox horizontal>
      <ControlLabel>{label}</ControlLabel>
      {(error || hint) && <InputHint invalid={!!error}>{error || hint}</InputHint>}
    </Flexbox>
    <Flexbox horizontal>
      <Input
        placeholder={placeholder}
        invalid={!!error}
        valid={valid}
        fullWidth
      />
      {(!!error || valid) && <InputAdornment invalid={!!error} valid={valid} />}
    </Flexbox>
  </div>
)

TextField.propTypes = {
  /** Label text. */
  label: PropTypes.string.isRequired,
  /** Valid style. */
  valid: PropTypes.bool,
  /** Hint text. */
  hint: PropTypes.string,
  /** Error text. The invalid input style is based on existence of this prop. */
  error: PropTypes.string,
  /** Placeholder text. */
  placeholder: PropTypes.string
}

TextField.displayName = 'TextField'

/* @component */
export default TextField
