import React from 'react'
import { ImageColumn } from 'scenes/Dashboard/components'
import { CommunityMenu } from 'components'
import Description from './Description'

export default [
  {
    field: 'image',
    // eslint-disable-next-line react/display-name
    render: ({ row }) => <ImageColumn value={row.image} size={40} />, // eslint-disable-line react/prop-types
    props: { width: '40px' }
  },
  {
    field: 'text',
    render: Description
  },
  {
    field: 'id',
    // eslint-disable-next-line react/display-name
    render: ({ row }) => <CommunityMenu community={row} />, // eslint-disable-line react/prop-types
    props: { width: '150px' }
  }
]
