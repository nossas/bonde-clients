import React from 'react'
import styled from 'styled-components'
import ControlLabel from '../ControlLabel/ControlLabel'
import Input from '../Input/Input'
import Flexbox from '../../layout/Flexbox/Flexbox'
import InputAdornment from '../InputAdornment/InputAdornment'
import InputHint from '../InputHint/InputHint'

const TextField = ({ invalid, valid, hint, error, label, placeholder }) => {
  return (
    <div>
      <Flexbox horizontal>
        <ControlLabel>{label}</ControlLabel>
        {(error || hint) && <InputHint invalid={invalid}>{error || hint}</InputHint>}
      </Flexbox>
      <Flexbox horizontal>
        <Input
          placeholder={placeholder}
          invalid={invalid}
          valid={valid}
          fullWidth
        />
        {(invalid || valid) && <InputAdornment invalid={invalid} valid={valid} />}
      </Flexbox>
    </div>
  )
}

/* @component */
export default TextField
