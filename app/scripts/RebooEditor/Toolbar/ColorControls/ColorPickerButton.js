import React, { Component, PropTypes } from 'react'
import { SketchPicker } from 'react-color'


class ColorPickerButton extends Component {

  constructor(props) {
    super(props)
    this.state = { showColorPicker: false }
  }

  componentWillReceiveProps(nextProps) {
    const { color } = nextProps
    if (this.props.color !== color) {
      this.setState({ color })
    }
  }

  toggleColorPicker(e) {
    this.setState({ showColorPicker: !this.state.showColorPicker })
  }

  handleChange(color) {
    this.setState({ color: color.rgb })
  }

  handleChangeColor(color) {
    const { onChangeColor } = this.props
    this.setState({ showColorPicker: false })
    onChangeColor(this.state.color)
  }

  render() {

    const { showColorPicker, color } = this.state
    const { className, onRemoveColor } = this.props

    return (
      <div>
        <button type="button" className={className} onClick={this.toggleColorPicker.bind(this)}>
          <i className="fa fa-eyedropper" />
        </button>
        {(showColorPicker ? (
          <div>
            <SketchPicker
              color={color}
              onChangeComplete={this.handleChange.bind(this)}
            />
            <button className="button button-outline white mr1" onClick={this.handleChangeColor.bind(this)}>Ok</button>
            <button className="button button-outline white mr1" onClick={onRemoveColor}>Remove</button>
          </div>
        ) : null)}
      </div>
    )
  }
}

ColorPickerButton.propTypes = {
  color: PropTypes.object,
  onRemoveColor: PropTypes.func.isRequired,
  onChangeColor: PropTypes.func.isRequired,
  className: PropTypes.string,
}

export default ColorPickerButton
