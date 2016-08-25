import React, { PropTypes } from 'react'

const HelpBlock = ({ children, ...props }) => {
  return (
    <p {...props}><small className="muted"><em>{children}</em></small></p>
  )
}

export default HelpBlock
