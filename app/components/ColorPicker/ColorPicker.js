import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { SketchPicker } from 'react-color'

import themes from './themes'
import * as ColorPickerActions from './ColorPickerActions'

export const ColorPicker = ({
  dispatch,
  className,
  theme,
  showColorPicker,
  onChangeColor,
  selectedColor,
  // Actions
  setSelectedColor
}) => {
  const hasTheme = theme && themes[theme]
  const defaultAction = color => dispatch(setSelectedColor(color.rgb))

  return !showColorPicker ? null : (
    <SketchPicker
      {...{
        className,
        onChangeComplete: onChangeColor || defaultAction,
        color: selectedColor ? selectedColor : (hasTheme ? themes[theme][0] : '#333'),
        presetColors: hasTheme ? themes[theme] : []
      }}
    />
  )
}

ColorPicker.propTypes = {
  dispatch: PropTypes.func.isRequired,
  showColorPicker: PropTypes.bool.isRequired,
  color: PropTypes.object,
  onChangeColor: PropTypes.func,
  className: PropTypes.string,
  theme: PropTypes.string
}

ColorPicker.defaultProps = {
  showColorPicker: true
}

const mapStateToProps = state => ({
  selectedColor: state.colorPicker.color || '#333'
})

export default connect(mapStateToProps, ColorPickerActions)(ColorPicker)
