import { bool, shape, string, object, oneOf } from 'prop-types'
import React from 'react'
// import { FormattedMessage } from 'react-intl'

const FinishPostDonation = ({
  preview,
  href,
  message,
  imageUrl,
  imageWidth,
  widget
}) => {
  // const settings = widget.settings || {}

  return (
    <div className='center p3 bg-white darkengray rounded'>
      teste
    </div>
  )
}

FinishPostDonation.propTypes = {
  preview: bool,
  widget: shape({
    settings: shape({
      whatsapp_text: string
    })
  }),
  message: oneOf([string, object]),
  href: string,
  imageUrl: string,
  imageWidth: string
}

FinishPostDonation.defaultProps = {
  imageUrl: require('exenv').canUseDOM ? require('../share/check-mark-image.png') : null
}

export default FinishPostDonation

