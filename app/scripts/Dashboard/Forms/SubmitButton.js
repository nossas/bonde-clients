import React, { Component, PropTypes } from 'react'
import classnames from 'classnames'


class SubmitButton extends Component {

  render() {
    const { $formRedux: { submitted, submitting, dirty, valid } } = this.context
    const { children, className } = this.props

    return (
      <button
        type="submit"
        disabled={!valid || submitting || !dirty}
        className={classnames("btn py2 caps", className, !valid ? 'bg-gray95' : 'bg-pagenta')}
      >
        {children}
      </button>
    )
  }
}

SubmitButton.contextTypes = {
  $formRedux: PropTypes.object,
}

SubmitButton.propTypes = {
  children: PropTypes.any.isRequired,
  className: PropTypes.string,
}

export default SubmitButton
