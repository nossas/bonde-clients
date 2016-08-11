import React, { PropTypes } from 'react'


const Textarea = (props) => {
  const { children, id, name, handleChange, handleBlur, value, ...inheritProps } = props

  return (
    <textarea
      id={id ? id : null}
      className="field-light block h3 full-width mt1 mb3 px1"
      style={{height: "20rem"}}
      value={value}
      onChange={handleChange(name)}
      onBlur={handleBlur(name)}
      {...inheritProps} />
  )
}

Textarea.propTypes = {
  placeholder: PropTypes.string
}

export default Textarea
