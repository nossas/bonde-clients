import React from 'react'
import PropTypes from 'prop-types'
import { Flexbox2 as Flexbox, Loading, Text, Title } from '../../../'

const TextLoading = ({ message }) => (
  <Flexbox vertical middle>
    <Text align='center' margin={{ top: '20vh' }}>
      <Loading
        size={109}
        sparklesDuration='3s'
      />
    </Text>
    {message && (
      <Title.H3 align='center'>
        {message}
      </Title.H3>
    )}
  </Flexbox>
)

TextLoading.propTypes = {
  message: PropTypes.string
}

export default TextLoading
