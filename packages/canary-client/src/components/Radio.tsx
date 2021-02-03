import React, { createContext, useContext } from "react";
import { FormField, Hint, Label, useField } from "bonde-components";
import { css } from "styled-components/macro";

type RadioFieldProps = {
  children: any
  label: string
  name: string
  direction?: 'row' | 'column'
}

const RadioFieldContext = createContext({});

const RadioField = ({ children, label, name, direction }: RadioFieldProps) => {
  const { input, meta } = useField(name);

  return (
    <RadioFieldContext.Provider value={{ input }}>
      <FormField>
        <Label>{label}</Label>
        {meta.error && <Hint color='error'>{meta.error}</Hint>}
        <div css={css`
          display: flex;
          flex-direction: ${direction};
          margin: 15px 0 0 -15px;
        `}>
          {children}
        </div>
      </FormField>
    </RadioFieldContext.Provider>
  );
}

RadioField.defaultProps = {
  direction: 'row'
}

export const Radio = ({ children, value }: any) => {
  const { input }: any = useContext(RadioFieldContext);

  return (
    <Label css={css`
      margin-left: 15px;
      align-items: center;

      input {
        margin-right: 8px;
      }
    `}>
      <input
        type="radio"
        checked={input.value === value}
        onChange={input.onChange}
        value={value}
      />
      {children}
    </Label>
  );
}

export default RadioField;