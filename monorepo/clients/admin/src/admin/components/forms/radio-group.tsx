import classnames from 'classnames'
import PropTypes from 'prop-types'
import React from 'react'

class RadioGroup extends React.Component {
  render() {
    const formGroup = this.context.$formGroup
    const { value, ...field } = formGroup || {}
    const { children, className, layout, style } = this.props

    return (
      <p className={classnames('mt1', className)} style={style}>
        {children && children.map((child, index) => {
          return child && React.cloneElement(child, {
            key: `radio-${index}`,
            checked: value,
            alignment: layout,
            ...field
          })
        })}
      </p>
    )
  }
}

RadioGroup.contextTypes = {
  $formGroup: PropTypes.object
}

RadioGroup.propTypes = {
  layout: PropTypes.oneOf(['horizontal', 'vertical']),
  style: PropTypes.object
}

RadioGroup.defaultProps = {
  layout: 'horizontal'
}

export default RadioGroup
