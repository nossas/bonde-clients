import React, { Component, PropTypes } from 'react'
import classnames from 'classnames'
import ReactColorPicker from 'react-color'


class ColorPicker extends Component {

  render() {
    const formGroup = this.context.$formGroup
    const { value, onChange } = formGroup || {}
    const { className, ...props } = this.props

    return (
      <div className={classnames("mt1 mb3", className)}>
        <ReactColorPicker color={value} onChangeComplete={color => onChange(color.hex)} type="sketch" />
      </div>
    )
  }
}

ColorPicker.contextTypes = {
  $formGroup: PropTypes.object,
}

export default ColorPicker
