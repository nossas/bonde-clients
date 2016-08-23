import React, { PropTypes } from 'react'
import classnames from 'classnames'
import ReactColorPicker from 'react-color'


const ColorPicker = ({ className, value, onChange, ...props }) => {

  return (
    <div className={classnames("mt1 mb3", className)}>
      <ReactColorPicker color={value} onChangeComplete={color => onChange(color.hex)} type="sketch" />
    </div>
  )
}

ColorPicker.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
}

export default ColorPicker
