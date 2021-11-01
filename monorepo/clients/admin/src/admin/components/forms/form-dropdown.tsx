import classnames from 'classnames'
import PropTypes from 'prop-types'
import React from 'react'

class FormDropdown extends React.Component {
  render() {
    const formGroup = this.context.$formGroup
    const { controlId, ...field } = formGroup || {}
    const { className, children, ...props } = this.props

    delete field.layout
    delete field.error
    delete field.touched
    delete field.valid

    return (
      <select
        id={controlId}
        className={classnames('select col-12', className)}
        {...field}
        {...props}
      >
        {!!children && children}
      </select>
    )
  }
}

FormDropdown.contextTypes = {
  $formGroup: PropTypes.object
}

FormDropdown.propTypes = {
  id: PropTypes.string,
  className: PropTypes.oneOfType([PropTypes.array, PropTypes.string])
}

export default FormDropdown
