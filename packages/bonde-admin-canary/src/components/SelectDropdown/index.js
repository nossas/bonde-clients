import React from 'react'
import PropTypes from 'prop-types'
import { Dropdown, DropdownItem } from 'bonde-styleguide'

class SelectDropdown extends React.Component {
  state = {
    currentOption: undefined 
  }

  onChange = currentOption => {
    this.setState({ currentOption })
    this.props.onChange(currentOption)
  }

  render () {
    const { initialOption, options } = this.props
    let { currentOption } = this.state
    if (!currentOption) {
      currentOption = initialOption || options[0]
    }

    return (
      <Dropdown label={currentOption.label} inverted>
        {options.map(option => (
          <DropdownItem
            key={Math.random()}
            onClick={({ closeMenu }) => {
              closeMenu()
              if (currentOption.value !== option.value) {
                this.onChange(option)
              }
            }}
          >
            {option.label}
          </DropdownItem>
        ))}
      </Dropdown>
    )
  }
}

const { oneOfType, arrayOf, shape, string, number, node, func } = PropTypes

const optionShape = shape({
  label: oneOfType([node, func, string]),
  value: oneOfType([string, number])
})

SelectDropdown.propTypes = {
  options: arrayOf(optionShape).isRequired,

  onChange: func,
  initialOption: optionShape,
}

SelectDropdown.defaultProps = {
  onChange: f => f
}

export default SelectDropdown
