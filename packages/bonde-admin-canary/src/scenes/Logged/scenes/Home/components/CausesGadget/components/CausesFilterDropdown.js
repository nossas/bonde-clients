import React from 'react'
import PropTypes from 'prop-types'
import { Dropdown, DropdownItem } from 'bonde-styleguide'

const FILTERS = {
  now: {
    label: 'Para agir agora',
    period: 2
  },
  inspire: {
    label: 'Para se inspirar',
    period: 90
  },
}

const CausesFilterDropdown = ({ mutate, onChange, selected }) => (
  <Dropdown
    light
    label={FILTERS[selected].label}
    style={{ display: 'inline-block', marginLeft: 15 }}
  >
    {Object.keys(FILTERS).map(filter => (
      <DropdownItem
        onClick={() => {
          onChange(filter)
          mutate({ variables: { days: FILTERS[filter].period } })
        }}>
        {FILTERS[filter].label}
      </DropdownItem>
    ))}
  </Dropdown>
)

const { shape, string, func, number } = PropTypes

CausesFilterDropdown.propTypes = {
  mutate: func.isRequired,
  onChange: func.isRequired,
  selected: string.isRequired,
}

CausesFilterDropdown.FILTERS = FILTERS

export default CausesFilterDropdown
