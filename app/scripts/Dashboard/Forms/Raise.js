import React, { PropTypes } from 'react'
import classnames from 'classnames'


const Raise = ({ className, error, ...props }) => {

  return (
    <span className={classnames("red mt1 h4", className)} {...props}>{error}</span>
  )
}

Raise.propTypes = {
  error: PropTypes.string.isRequired,
}

export default Raise
