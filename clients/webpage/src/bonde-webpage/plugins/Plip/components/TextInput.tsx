import React from 'react';
import {Field} from 'react-final-form';

const TextInputComponent = (props : any) => {

  const {
    label,
    id,
    input,
    ...rest
  } = props;

  console.log(input);

  const isTextArea = input.type === 'textarea';
  const { type, ...inputWithoutType } = input;

  const inputProps = isTextArea ?
  {
    id,
    ...inputWithoutType,
    ...rest
  } : {
    id,
    type,
    ...inputWithoutType,
    ...rest
  };

  return(
    <div>
      {label ? <label htmlFor={id}>{label}</label> : null}
      {isTextArea ? <textarea {...inputProps} /> : <input {...inputProps} />}
    </div>
  )
}

const TextInput = props => {
  return <Field component={TextInputComponent} {...props} />
}

export default TextInput;
