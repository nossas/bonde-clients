import React, { Component, PropTypes } from 'react'
import classnames from 'classnames'

import { ControlButtons } from './'

class FormControl extends Component {
  render() {
    const { ...props, componentClass: Component, className, style, submitted } = this.props
    const {
      $formRedux: { formInline, submitting, dirty },
      $formGroup: { controlId, ...field }
    } = this.context

    const componentStyle = {
      height: Component === 'textarea' ? '20rem' : '48px',
      width: formInline ? '250px' : null
    }
    const componentClassNames = formInline ?
      'field-light h3 px1 inline-block' :
      'field-light block h3 px1 full-width'

    return (
      <div className='mt1'>
        <Component
          {...props}
          {...field}
          id={controlId}
          className={classnames('form-control-input', componentClassNames, className)}
          style={{ ...componentStyle, ...style }}
          />
        {
          formInline &&
          <ControlButtons {...{ submitted, submitting, dirty, showCancel: false, formInline }} />
        }
      </div>
    )
  }
}

FormControl.contextTypes = {
  $formRedux: PropTypes.shape({
    formInline: PropTypes.bool,
    submitting: PropTypes.bool,
    dirty: PropTypes.bool
  }),
  $formGroup: PropTypes.shape({
    controlId: PropTypes.string
  })
}

FormControl.propTypes = {
  submitted: PropTypes.bool.isRequired,
  componentClass: PropTypes.string.isRequired,
  style: PropTypes.object
}

FormControl.defaultProps = {
  componentClass: 'input',
  submitting: false,
  submitted: false
}

export default FormControl
