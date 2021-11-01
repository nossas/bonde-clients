import PropTypes from 'prop-types'
import BasicColorPickerItem from './basic-color-picker-item'


function BasicColorPicker({ colors, selected, onSelectColor }) {
  return <div>
    {colors && colors.map((color, indexColor) => (
      <BasicColorPickerItem
        key={indexColor}
        color={color}
        isSelected={color === selected}
        onSelectColor={onSelectColor}
      />
    ))}
  </div>
}

BasicColorPicker.propTypes = {
  colors: PropTypes.array.isRequired,
  selected: PropTypes.string,
  onSelectColor: PropTypes.func
}

export default BasicColorPicker
