import React from 'react'

const MultipleChoiceField = ({
  inputComponent: InputComponent,
  input,
  options,
  separator
}) => {
  
  let values = input.value ? input.value.split(separator) : []
  
  const onChangeField = (evt) => {
    const value = evt.target.value
    if (values.includes(value)) {
      values = values.filter(val => val !== value)
    } else {
      values.push(value)
    }
    input.onChange(values.join(separator))
  }
  
  return (
    <React.Fragment>
      {options.map((field) => (
        <InputComponent
          key={`inputKey-${field.value}`}
          {...field}
          checked={values.includes(field.value)}
          onChange={onChangeField}
        />
      ))}
    </React.Fragment>
  )
}

MultipleChoiceField.defaultProps = {
  separator: ';'
}

export default MultipleChoiceField
