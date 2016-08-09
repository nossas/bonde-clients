import React, { PropTypes } from 'react'


const Input = (props) => {
  const { children, id, name, handleChange, handleBlur, type, value, ...inheritProps } = props

  if (type !== 'radio') {
    return (
      <input
        id={id ? id : null}
        className="field-light block h3 full-width mt1 mb3 px1"
        style={{height: '48px'}}
        value={value}
        onChange={handleChange(name)}
        onBlur={handleBlur(name)}
        {...inheritProps} />
    )
  }
  return (
    <p id={id ? id : null} className="mt1 mb3">
      {children && children.map(child => {
        return React.cloneElement(child, { name, type, handleChange, handleBlur, selected: value, ...inheritProps })
      })}
    </p>
  )
}

Input.propTypes = {
  placeholder: PropTypes.string,
  type: PropTypes.oneOf(['text', 'email', 'radio'])
}

export default Input
