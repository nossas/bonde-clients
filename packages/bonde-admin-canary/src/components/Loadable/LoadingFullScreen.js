import React from 'react'
import { Backdrop, Loading, Text, Title } from 'bonde-styleguide'

const LoadingFullScreen = ({ message }) => (
  <Backdrop color='#FFFFFF'>
    <Text align='center' margin={{ top: '20vh' }}>
      <Loading
        size={109}
        sparklesDuration='3s'
      />
    </Text>
    <Title.H3 align='center'>
      {message || 'Preparando seu BONDE.'}
    </Title.H3>
  </Backdrop>
)

export default LoadingFullScreen
