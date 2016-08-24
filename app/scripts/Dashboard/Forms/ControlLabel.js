import React, { Component, PropTypes } from 'react'
import classnames from 'classnames'


class ControlLabel extends Component {

  render() {
    const formGroup = this.context.$formGroup
    const controlId = formGroup && formGroup.controlId

    const { children, htmlFor = controlId, className, ...props } = this.props

    return (
      <label
        style={{ cursor: 'pointer' }}
        htmlFor={htmlFor}
        className={classnames("h5 bold caps", className)}
        {...props}
      >
        {children}
      </label>
    )
  }
}

ControlLabel.contextTypes = {
  $formGroup: PropTypes.object,
}

ControlLabel.propTypes = {
  htmlFor: PropTypes.string,
}

export default ControlLabel
