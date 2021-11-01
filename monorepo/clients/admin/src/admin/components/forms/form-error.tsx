import classnames from 'classnames'
import PropTypes from 'prop-types'
import React from 'react'

class FormError extends React.Component {
  render() {
    const { $formRedux: { error } } = this.context
    const { className } = this.props

    return !error ? null : (
      <div className={classnames('h5 white bold center animated shake', className)}>
        {error}
      </div>
    )
  }
}

FormError.contextTypes = {
  $formRedux: PropTypes.object
}

FormError.propTypes = {
  className: PropTypes.string
}

export default FormError
