import React, { Component, PropTypes } from 'react'
import classnames from 'classnames'


class Radio extends Component {

  render() {
    const { children, layout, className, checked, value, onChange, ...props } = this.props
    const id = `radio-${value}-id`

    const classes = layout === 'horizontal' ? 'mr1' : layout === 'vertical' ? 'block' : null

    return (
      <label className={classnames(className, classes)} style={{cursor: 'pointer'}} htmlFor={id}>
        <input type="radio" id={id} checked={checked === value} value={value} onChange={onChange} />
        {children}
      </label>
    )
  }
}

Radio.propTypes = {
  checked: PropTypes.any,
  layout: PropTypes.oneOf(['horizontal', 'vertical']),
}

export default Radio
