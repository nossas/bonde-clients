import React from 'react';
import styled from '@emotion/styled';
import { useField } from 'react-final-form';
import InputMask from 'react-input-mask';

import Box from './Box';
import Label from './Label';
import Raise from './Raise';

const InputStyled = styled.input`
  border: none;
  height: 2rem;
  outline: none;
  font-size: 0.9rem;
  width: 100%;
  font-family: "Nunito Sans", sans-serif;
  color: rgb(0, 0, 0);
  padding: 8px 0px;
  background: none;
`;

export interface InputFieldProperties {
  name: string;
  placeholder?: string;
  type?: string;
  label?: string;
  validate?: any;
  disabled?: boolean;
  mask?: string;
}

const InputField: React.FC<InputFieldProperties> = ({
  name,
  placeholder,
  type,
  label,
  disabled,
  validate,
  mask
}) => {
  const { input, meta } = useField(name, { validate });

  return (
    <>
      <Box>
        {label && <Label>{label}</Label>}
        {meta.touched && meta.error && <Raise>{meta.error}</Raise>}
      </Box>
      {mask ? (
        <InputMask mask={mask} value={input.value} onChange={input.onChange}>
          {(inputProps) => <InputStyled {...inputProps} type="tel" disableUnderline />}
        </InputMask>
      ) : (
        <InputStyled
          {...input}
          disabled={disabled}
          placeholder={placeholder}
          type={type || input.type}
        />
      )}
    </>
  );
}

export default InputField;