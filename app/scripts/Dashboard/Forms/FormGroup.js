import React, { Component, PropTypes } from 'react'
import classnames from 'classnames'

class FormGroup extends Component {
  getChildContext() {
    const { controlId, layout, value, onChange, onBlur, error, touched, valid } = this.props
    return {
      $formGroup: { controlId, layout, value, onChange, onBlur, error, touched, valid }
    }
  }

  render() {
    const { children, className, layout } = this.props
    const styleGroup = layout === 'inline' ? { paddingRight: '1rem' } : null

    return (
      <div className={classnames('form-group', className)} style={styleGroup}>
        {children}
      </div>
    )
  }
}

FormGroup.contextTypes = {
  $formRedux: PropTypes.object
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
  $formGroup: PropTypes.object.isRequired
}

export default FormGroup
