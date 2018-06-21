import React from 'react'
import PropTypes from 'prop-types'
import { Dropdown, DropdownItem } from 'bonde-styleguide'

class SelectDropdown extends React.Component {
  constructor (...args) {
    super(...args)

    this.state = {
      currentOption: this.props.initialOption || this.props.options[0]
    }
  }

  onChange = currentOption => {
    if (currentOption.value !== this.state.currentOption.value) {
      this.setState({ ...this.state, currentOption })
      this.props.onChange(currentOption)
    }
  }

  render () {
    const { options } = this.props
    const { currentOption } = this.state

    return (
      <Dropdown label={currentOption.label} inverted>
        {options.map(option => (
          <DropdownItem
            key={Math.random()}
            onClick={({ closeMenu }) => { closeMenu(); this.onChange(option) }}
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
