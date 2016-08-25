import React, { Component, PropTypes } from 'react'
import classnames from 'classnames'

import Raise from './Raise'


class FormGroup extends Component {

  getChildContext() {
    const { controlId, layout, value, onChange, onBlur } = this.props
    return {
      $formGroup: {
        controlId,
        value,
        onChange,
        onBlur
      }
    }
  }

  render() {
    const { children, className, error, touched, layout } = this.props
    const styleGroup = layout === 'inline' ? { paddingRight: '1rem' } : null

    return (
      <div className={classnames(className, 'mt1 mb2')} style={styleGroup}>
        {children}
        {error && touched && <Raise error={error} />}
      </div>
    )
  }
}

FormGroup.propTypes = {
  controlId: PropTypes.string,
  className: PropTypes.string,
  error: PropTypes.string,
  touched: PropTypes.bool,
  layout: PropTypes.oneOf(['inline', 'block'])
}

FormGroup.defaultProps = {
  layout: 'block'
}

FormGroup.childContextTypes = {
  $formGroup: React.PropTypes.object.isRequired,
}

export default FormGroup
