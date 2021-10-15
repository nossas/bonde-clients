import React from 'react';
import styled from '@emotion/styled';
import { css } from "@emotion/react";
import { useField } from 'react-final-form';
import FormField from './FormField';
import RoundInput from './RoundInput';
import theme from '../base/theme';

// interface Props extends Record<string, any> {
//   name: string;
//   type?: string;
//   label?: string;
//   helpText?: string;
//   placeholder?: string;
//   disabled?: boolean;
//   onBlur?: (e: any) => void;
// };

const StyledFormField = styled(FormField)<{
  invalid?: boolean;
  value?: string;
}>`
  border: 1px solid;
  border-radius: 7px;
  padding: 0;
  ${(props: any) =>
    !props.value
      ? css`
          &:hover,
          &:focus {
            border-color: ${props.theme.commons.main};
          }
          border-color: ${props.theme.commons.main};
        `
      : css`
          &:hover,
          &:focus {
            border-color: ${props.theme.brand.main};
          }
          border-color: ${props.theme.brand.main};
        `}

  ${(props: any) =>
    props.invalid &&
    `
    border-color: ${props.theme.error};
  `}
`;

StyledFormField.defaultProps = {
  theme,
};

const RoundInputField: React.FC<any> = ({
  name,
  type,
  label,
  helpText,
  placeholder,
  disabled,
  onBlur,
  ...config
}) => {
  const { input, meta } = useField(name, config);

  return (
    <FormField label={label} helpText={helpText}>
      <RoundInput
        {...input}
        placeholder={placeholder}
        type={type}
        invalid={(meta.error || meta.submitError) && meta.touched}
        disabled={disabled}
        onBlur={(e: any) => {
          onBlur && onBlur(e);
          input.onBlur(e);
        }}
      />
    </FormField>
  );
};

export default RoundInputField;
