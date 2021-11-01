import classnames from 'classnames'
import PropTypes from 'prop-types'


function BasicColorPickerItem({ color, isSelected, onSelectColor }) {
  return <div className='col col-1 p1'>
    <div
      className={classnames(
        'col col-12 border-only-bottom border-darken-3 rounded btn bg-white',
        color
      )}
      style={isSelected ? { borderWidth: '5px' } : null}
      onClick={() => onSelectColor(color)}
    >
      <br />
    </div>
  </div>
}

BasicColorPickerItem.propTypes = {
  color: PropTypes.string.isRequired,
  isSelected: PropTypes.bool,
  onSelectColor: PropTypes.func
}

export default BasicColorPickerItem
