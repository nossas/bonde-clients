
import classnames from 'classnames'
import React from 'react'

export default (WrappedComponent) => class PP extends React.Component {
  render() {
    const colProperties = {
      className: classnames('flex-auto', this.props.className)
    }

    return (
      <WrappedComponent {...this.props} {...colProperties} />
    )
  }
}
