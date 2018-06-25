import React from 'react'
import { Image, IconColorful } from 'bonde-styleguide'

const defaultImageStyle = {
  backgroundColor: '#424242',
  borderRadius: '40px',
  padding: '6px 7px 5px 8px',
  textAlign: 'center'
}

const DefaultImage = () => (
  <div style={defaultImageStyle}>
    <IconColorful name='community' size={25} />
  </div>
)

const ImageCol = ({ value }) => value
  ? <Image src={value} width={40} height={40} rounded={40} />
  : <DefaultImage />

export default ImageCol
