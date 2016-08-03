import React, { Component } from 'react'


class WrapperMobilizationApp extends Component {

  render() {
    const { children, ...otherProps } = this.props
    return (
      <div className="wrap-mobilization flex flex-auto overflow-hidden">
        {
          React.cloneElement(children, {...otherProps})
        }
      </div>
    )
  }
}

export default WrapperMobilizationApp
