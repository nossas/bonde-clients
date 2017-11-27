import React from 'react'
import FormGroup from '../formGroup'

export const Radio = ({ children, label, value, checked, onChange }) => (
  <label htmlFor={`${value}-id`}>
    <input
      id={`${value}-id`}
      value={value}
      type='radio'
      checked={value === checked}
      onChange={onChange}
    />
    {label || children}
  </label>
)

export default FormGroup(
  ({ children, value, ...inputProps }) => (
    <div>
      {children && children.map((child, index) => React.cloneElement(child, {
        key: `${inputProps.name}-radio-${index}`,
        checked: value,
        ...inputProps
      }))}
    </div>
  )
)
