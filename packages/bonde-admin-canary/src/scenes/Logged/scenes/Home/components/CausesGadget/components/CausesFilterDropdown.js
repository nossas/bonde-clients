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

<<<<<<< HEAD
const { string, func } = PropTypes
=======
const { shape, string, func, number } = PropTypes
>>>>>>> refator(admin-canary): trending mobs to causes gadget

CausesFilterDropdown.propTypes = {
  mutate: func.isRequired,
  onChange: func.isRequired,
  selected: string.isRequired,
}

CausesFilterDropdown.FILTERS = FILTERS

export default CausesFilterDropdown
