import React from 'react'
import PropTypes from 'prop-types'
import { I18n } from 'react-i18next'
import { SelectDropdown } from 'components'

const Filter = ({ filter, onChange }) => (
  <I18n ns='home'>
  {(t) => (
    <SelectDropdown
      initialValue={filter.orderBy}
      onChange={({ value }) => onChange({ orderBy: value })}
      options={[
        { 
          label: t('gadgets.filters.recent'),
          value: 'UPDATED_AT_DESC'
        },
        {
          label: t('gadgets.filters.alphabetic'),
          value: 'NAME_ASC'
        },
      ]}
    />
  )}
  </I18n>
)

Filter.propTypes = {
  filter: PropTypes.shape({
    orderBy: PropTypes.string
  }),
  onChange: PropTypes.func
}

export default Filter
