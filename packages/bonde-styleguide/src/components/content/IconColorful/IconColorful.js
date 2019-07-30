import React from 'react'
import PropTypes from 'prop-types'
import svg from './svg'

const IconColorful = ({ name, color, size, inverted }) => {
  const IconSVG = svg[name]

  return <IconSVG color={color} size={size} inverted={inverted} />
}

const { oneOfType, string, number, bool } = PropTypes

IconColorful.propTypes = {
  name: string.isRequired,
  size: oneOfType([string, number]),
  inverted: bool
}

IconColorful.defaultProps = {
  size: 13,
  inverted: false
}

IconColorful.displayName = 'IconColorful'

export default IconColorful
