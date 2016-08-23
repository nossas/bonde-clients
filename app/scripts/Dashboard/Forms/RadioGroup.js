import React, { Component, PropTypes } from 'react'
import classnames from 'classnames'


class RadioGroup extends Component {

  render() {
    const { children, className, value, ...props } = this.props

    return (
      <p className={classnames("mt1", className)}>
        {children && children.map(child => {
          return React.cloneElement(child, { checked: value, ...props })
        })}
      </p>
    )
  }
}

RadioGroup.propTypes = {
  layout: PropTypes.oneOf(['horizontal', 'vertical']),
}

RadioGroup.defaultProps = {
  layout: 'horizontal'
}

export default RadioGroup
