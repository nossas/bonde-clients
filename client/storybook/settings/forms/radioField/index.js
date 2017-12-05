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

export default FormGroup((props) => {
  const { children, value, checked, ...inputProps } = props
  return (
    <div>
      {children && children.map((child, index) => React.cloneElement(child, {
        key: `${inputProps.name}-radio-${index}`,
        checked: checked || value,
        ...inputProps
      }))}
    </div>
  )
})
