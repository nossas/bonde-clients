import { bool, string, object, oneOf } from 'prop-types'
import React from 'react'

import TellAFriendBase from 'bonde-webpage/lib/ux/'

const FinishPostDonation = ({
  preview,
  href,
  message,
  imageUrl,
  imageWidth,
  widget
}) => {
  console.log('preview', preview)
  console.log('href', href)
  console.log('message', message)
  console.log('imageUrl', imageUrl)
  console.log('imageWidth', imageWidth)
  console.log('widget', widget)

  return (
    <div className='center p3 darkengray rounded'>
      teste
    </div>
  )
}

FinishPostDonation.propTypes = {
  preview: bool,
  widget: object,
  message: oneOf([string, object]),
  href: string,
  imageUrl: string,
  imageWidth: string
}

FinishPostDonation.defaultProps = {
  imageUrl: require('exenv').canUseDOM ? require('../share/check-mark-image.png') : null
}

export default FinishPostDonation
