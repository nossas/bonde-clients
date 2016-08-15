import React, { Component, PropTypes } from 'react'
import ColorPicker from 'react-color'


class ColorInput extends Component {

  constructor(props) {
    super(props)
    this.state = {
      color: props.value || ''
    }
  }

  render() {
    const { id, name, handleChange } = this.props

    return (
      <div className="mt1 mb3">
        <ColorPicker
          color={this.props.value}
          onChangeComplete={color => handleChange(name, color.hex)()} // wrapper function and call wrapped
          type="sketch" />
      </div>
    )
  }
}

ColorInput.propTypes = {
  value: PropTypes.string,
  handleChange: PropTypes.func,
}

export default ColorInput
