import React, { Component, PropTypes } from 'react'
import classnames from 'classnames'


class FormDropdown extends Component {
  render() {
    const formGroup = this.context.$formGroup
    const { controlId, ...field } = formGroup || {}
    const { ...props, classNames, children } = this.props

    return (
      <select
        id={controlId}
        className={classnames('field-light block h3 mt1 px1 full-width', classNames)}
        {...props}
        {...field}
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
  classNames: PropTypes.array
}

export default FormDropdown
