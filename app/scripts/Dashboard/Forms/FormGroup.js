import React, { Component, PropTypes } from 'react'
import classnames from 'classnames'

import Raise from './Raise'


class FormGroup extends Component {

  getChildContext() {
    const { controlId } = this.props
    return {
      $formGroup: {
        controlId
      }
    }
  }

  render() {
    const { children, className, error, touched } = this.props

    return (
      <div className={classnames('mt1 mb2', className)}>
        {children}
        {error && touched && <Raise error={error} />}
      </div>
    )
  }
}

FormGroup.propTypes = {
  controlId: PropTypes.string.isRequired,
  className: PropTypes.string,
  error: PropTypes.string,
  touched: PropTypes.bool
}

FormGroup.childContextTypes = {
  $formGroup: React.PropTypes.object.isRequired,
}

export default FormGroup
