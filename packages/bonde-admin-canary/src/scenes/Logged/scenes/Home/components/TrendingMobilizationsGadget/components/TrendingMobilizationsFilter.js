import React from 'react'
import { SelectDropdown } from 'components'

const options = ({ t }) => [
  { label: t('gadgets.trendingMobilizations.filters.now'), value: 2 },
  { label: t('gadgets.trendingMobilizations.filters.inspire'), value: 90 },
]

const TrendingMobilizationsFilter = ({ t }) => (
  <SelectDropdown
    onChange={option => { console.log('[SelectDropdown.onChange]', option) }}
    options={options({ t })}
  />
)

export default TrendingMobilizationsFilter
