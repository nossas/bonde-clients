import React, { PropTypes } from 'react'


const Control = (props) => {
  const { children, id, label, name, placeholder } = props
  const { errors, touched, handleChange, handleBlur } = props

  return (
    <div className="mt1">
      {label && <label style={{cursor: 'pointer'}} className="h5 bold caps" htmlFor={id ? id : null}>{label}</label>}
      {errors && touched && errors[name] && touched[name] && <span className="red ml2">{errors[name]}</span>}
      {children && React.cloneElement(children, { id, name, handleChange, handleBlur })}
    </div>
  )
}

Control.propTypes = {
  id: PropTypes.string,
  label: PropTypes.string,
  erros: PropTypes.object,
  name: PropTypes.string,
  value: PropTypes.string,
  placeholder: PropTypes.string,
  handleChange: PropTypes.func.isRequired,
  handleBlur: PropTypes.func.isRequired
}

export default Control
