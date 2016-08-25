import React, { Component, PropTypes } from 'react'
import classnames from 'classnames'


class FormControl extends Component {

  render() {
    const formGroup = this.context.$formGroup
    const { controlId, ...field } = formGroup || {}

    const {
      componentClass: Component,
      id = controlId,
      className,
      ...props
    } = this.props

    const componentStyle = { height: Component === 'textarea' ? '20rem' : '48px' }

    return (
      <Component
        id={id}
        className={classnames('field-light block h3 mt1 px1 full-width', className)}
        style={componentStyle}
        {...props}
        // passed by $formGroup with redux-form field props
        {...field}
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
