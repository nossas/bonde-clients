import React from 'react'
import { Text } from 'bonde-styleguide'
import { ImageColumn } from '../../components'

export default [
  {
    field: 'image',
    render: ImageColumn
  },
  {
    field: 'text',
    render: ({ row }) => (
      <React.Fragment>
        <Text
          fontSize={16}
          fontWeight={900}
          lineHeight={1.25}
        >
          {row.name}
        </Text>
        <Text
          fontSize={13}
          lineHeight={1.54}
          color='#4a4a4a'
        >
          {row.description || row.city}
        </Text>
      </React.Fragment>
    )
  },
]
