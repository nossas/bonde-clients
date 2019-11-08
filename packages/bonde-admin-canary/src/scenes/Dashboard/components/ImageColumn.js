import React from 'react'
import { Image, IconColorful } from 'bonde-styleguide'
import PropTypes from 'prop-types'

const defaultImageStyle = (props = {}) => ({
  backgroundColor: '#424242',
  borderRadius: '40px',
  padding: '6px 7px 5px 8px',
  textAlign: 'center',
  ...props
})

const DefaultImage = (props) => (
  <div style={defaultImageStyle(props)}>
    <IconColorful name='community' size={25} />
  </div>
)

const ImageCol = ({ value, size, ...rest }) => {
  return value
    ? <Image src={value} width={size} height={size} rounded={size} {...rest} />
    : <DefaultImage width={`${size}px`} height={`${size}px`} {...rest} />
}

ImageCol.propTypes = {
  value: PropTypes.string,
  size: PropTypes.number
}

export default ImageCol
