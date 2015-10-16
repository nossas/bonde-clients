import React, { PropTypes } from 'react'

const MobilizationSettings = React.createClass({
  render() {
    const { children, ...otherProps } = this.props

    return (
      React.cloneElement(children, {...otherProps})
    )
  }
})

export default MobilizationSettings
