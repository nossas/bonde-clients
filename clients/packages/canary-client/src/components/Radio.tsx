import React, { createContext, useContext } from "react";
import { FormField, Hint, Label, useField } from "bonde-components";
import styled from "styled-components";

type RadioFieldProps = {
  children: any
  label: string
  name: string
  direction?: 'row' | 'column'
}

const RadioFieldContext = createContext({});

const Box = styled.div<{ direction?: 'row' | 'column' }>`
  display: flex;
  flex-direction: ${props => props.direction};
  margin: 15px 0 0 -15px;
`

const RadioField = ({ children, label, name, direction }: RadioFieldProps) => {
  const { input, meta } = useField(name);

  return (
    <RadioFieldContext.Provider value={{ input }}>
      <FormField>
        <Label>{label}</Label>
        {meta.error && <Hint color='error'>{meta.error}</Hint>}
        <Box direction={direction}>
          {children}
        </Box>
      </FormField>
    </RadioFieldContext.Provider>
  );
}

RadioField.defaultProps = {
  direction: 'row'
}

const LabelStyled = styled(Label)`
  margin-left: 15px;
  align-items: center;

  input {
    margin-right: 8px;
  }
`

export const Radio = ({ children, value }: any) => {
  const { input }: any = useContext(RadioFieldContext);

  return (
    <LabelStyled>
      <input
        type="radio"
        checked={input.value === value}
        onChange={input.onChange}
        value={value}
      />
      {children}
    </LabelStyled>
  );
}

export default RadioField;