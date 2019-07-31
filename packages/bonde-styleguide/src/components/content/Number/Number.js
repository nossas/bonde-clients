import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import Text from '../Text/Text'

const TextNumber = styled(Text)`
  font-size: 32px !important;
  font-weight: 900 !important;
  margin: 0;
  display: flex;
  justify-content: space-between;
  flex-grow: 1;
`

const Number = ({ value, icon: Icon }) => {
  console.log(value)
  console.log(Icon)
  return (
    <TextNumber>
      <span>{value}</span>
      {Icon && Icon}
    </TextNumber>
  )
}

const { oneOfType, number, node, func } = PropTypes

Number.propTypes = {
  /** The value that will be displayed. */
  value: number,
  /** The icon that will be displayed besides the value. */
  icon: oneOfType([node, func])
}

Number.displayName = 'Number'

export default Number
