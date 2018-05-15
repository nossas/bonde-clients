import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import svg from './svg'

const Icon = styled(({ className, name, color, size }) => {
  const IconSVG = svg[name]

  return <IconSVG className={className} color={color} size={size} />
})`
  vertical-align: middle;
  margin: ${props => props.margin};
`

const { oneOfType, string, number } = PropTypes

Icon.propTypes = {
  /** The name of icon to be rendered. */
  name: string.isRequired,
  /** The color of icon. */
  color: string,
  /** The margin of icon. */
  margin: string,
  /** The size of icon. */
  size: oneOfType([string, number])
}

Icon.defaultProps = {
  color: '#000000',
  margin: '0 5px',
  size: 13
}

/** @component */
export default Icon
