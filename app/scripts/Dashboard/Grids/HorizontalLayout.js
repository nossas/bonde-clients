import React, { PropTypes } from 'react'
import classnames from 'classnames'


const HorizontalLayout = ({ children, className, cols, ...props }) => {

  const size = parseInt(12/cols)
  const childProps = {
    layout: 'inline',
    className: `sm-col sm-col-${size}`
  }

  return (
    <div className="form-horizontal-layout flex flex-wrap">
      {
        children && children.map(
          child => React.cloneElement(child, {...childProps})
        )
      }
    </div>
  )
}

HorizontalLayout.propTypes = {
  cols: PropTypes.number.isRequired,
}

HorizontalLayout.defaultProps = {
  cols: 1,
}

export default HorizontalLayout
