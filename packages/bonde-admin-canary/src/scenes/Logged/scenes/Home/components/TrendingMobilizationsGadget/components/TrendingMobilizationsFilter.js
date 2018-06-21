import React from 'react'
import { SelectDropdown } from 'components'

const FILTERS = [
  { label: 'Para agir agora', value: 2 },
  { label: 'Para se inspirar', value: 90 },
]

const TrendingMobilizationsFilter = () => (
  <SelectDropdown
    onChange={option => { console.log('[SelectDropdown.onChange]', option) }}
    options={FILTERS}
  />
)

export default TrendingMobilizationsFilter
