import React from 'react'
import { Image } from 'bonde-styleguide'

const ImageCol = ({ value }) => (
  <Image src={value} width={40} height={40} rounded={40} />
)

export default ImageCol
