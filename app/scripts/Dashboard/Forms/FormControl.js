import React, { Component, PropTypes } from 'react'
import classnames from 'classnames'


class FormControl extends Component {

  render() {
    const formGroup = this.context.$formGroup
    const controlId = formGroup && formGroup.controlId

    const {
      componentClass: Component,
      id = controlId,
      className,
      ...props
    } = this.props

    return (
      <Component
        id={id}
        className={classnames('field-light block h3 mt1 px1', className)}
        style={{height: '48px'}}
        {...props}
      />
    )
  }
}

FormControl.contextTypes = {
  $formGroup: PropTypes.object,
}

FormControl.propTypes = {
  id: PropTypes.string,
  componentClass: PropTypes.element,
}

FormControl.defaultProps = {
  componentClass: 'input'
}

export default FormControl
