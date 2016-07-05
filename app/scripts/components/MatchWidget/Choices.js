import React, { PropTypes } from 'react'
import classnames from 'classnames'

const Choices = ({ options=[], onChange, title, classNames, disabled }) => {
  return (
    <div className={classnames(classNames)}>
      <label className="h4 caps bold mb1">{title}*</label>
      <select
        className="choices field-light block full-width h3"
        disabled={disabled}
        onChange={onChange}>
        <option>Selecione...</option>
        {options.map(option => {
          return <option value={option}>{option}</option>
        })}
      </select>
    </div>
  )
}

Choices.propTypes = {
  options: PropTypes.array.isRequired,
  onChange: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  disabled: PropTypes.bool.isRequired,
  classNames: PropTypes.array
}

export default Choices
