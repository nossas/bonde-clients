import React from 'react'
import { I18n } from 'react-i18next'
import { Icon, Text } from 'bonde-styleguide'

const StatusColumn = ({ value }) => (
  <I18n ns='home'>
  {(t) => {
    const statuses = {
      ACTIVE: {
        label: t('gadgets.mobilizations.statuses.active'),
        props: { color: '#50e3c2', fontWeight: 'bold' }
      },
      ARCHIVED: {
        label: t('gadgets.mobilizations.statuses.archived'),
        props: { color: '#aaaaaa', fontWeight: 'normal' }
      }
    }

    return (
      <Text
        fontSize={13}
        lineHeight={1.54}
        {...statuses[value].props}
      >
        {value === 'active' && (
          <Icon name='tick' color='#50e3c2' margin='0 5px 0 0' />
        )}
        {statuses[value].label}
      </Text>
    )
  }}
  </I18n>
)

export default StatusColumn
