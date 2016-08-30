import React, { Component, PropTypes } from 'react'

import { ControlButtons } from './'

class FormRedux extends Component {
  constructor(props) {
    super(props)
    this.state = { submitted: false }
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.submitting && !nextProps.submitting && !nextProps.submitFailed) {
      this.setState({ submitted: true })
    }
  }

  getChildContext() {
    const { inline, ...rest } = this.props
    return {
      $formRedux: {
        ...rest,
        formInline: inline
      }
    }
  }

  render() {
    const { children, onSubmit, handleSubmit, submitting, dirty, inline, className } = this.props
    const { submitted } = this.state

    return (
      <form onSubmit={handleSubmit(onSubmit)} className={className}>
        {children}
        {!inline && <ControlButtons {...{ submitted, submitting, dirty }} />}
      </form>
    )
  }
}

FormRedux.propTypes = {
  className: PropTypes.string,
  onSubmit: PropTypes.func.isRequired,
  // redux-form props
  handleSubmit: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired,
  submitFailed: PropTypes.bool.isRequired,
  dirty: PropTypes.bool.isRequired,
  inline: PropTypes.bool.isRequired
}

FormRedux.defaultProps = {
  submitting: false,
  inline: false,
  className: ''
}

FormRedux.childContextTypes = {
  $formRedux: PropTypes.object.isRequired
}

export default FormRedux
