import React from 'react'


const RadioButton = (props) => {
  const { children, id, className, value, selected, name, handleChange, handleBlur, ...inheritProps } = props
  return (
    <label style={{cursor: 'pointer'}} htmlForm={id} className={className}>
      <input
        id={id}
        value={value}
        checked={selected === value}
        onChange={handleChange(name)}
        onBlur={handleBlur(name)}
        {...inheritProps} />
      {children}
    </label>
  )
}

export default RadioButton
