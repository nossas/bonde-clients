import React from 'react'
import { Title, Text } from 'bonde-styleguide'

export default ({ title, description }) => (
  <React.Fragment>
    {title && (
      <Title.H3
        color='#fff'
        margin={{ bottom: 25 }}
      >
        {title}
      </Title.H3>
    )}
    {description && (
      <Text
        color='#fff'
        margin={{ bottom: 20 }}
      >
        {description}
      </Text>
    )}
  </React.Fragment>
)

