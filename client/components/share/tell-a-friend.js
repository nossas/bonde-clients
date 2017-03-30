import React, { PropTypes } from 'react'

import { FacebookShareButton, TwitterShareButton, WhatsAppShareButton } from '~components/share'

const TellAFriend = ({
  preview,
  href,
  message,
  mobilization: { twitter_share_text: twitterShareText },
  imageUrl,
  imageWidth,
  widget: { settings: { whatsapp_text: whatsappText } }
}) => (
  <div className='center p3 bg-white darkengray rounded'>
    <div className='m0 h3 bold'>{message}</div>
    <div className='py2'>
      <img src={imageUrl} style={{ width: imageWidth || 100 }} />
    </div>
    <p>Agora, compartilhe com seus amigos!</p>
    <p><FacebookShareButton href={href} /></p>
    <p><TwitterShareButton href={href} text={twitterShareText} /></p>
    <p><WhatsAppShareButton whatsappText={whatsappText || href} preview={preview} /></p>
  </div>
)

TellAFriend.propTypes = {
  preview: PropTypes.bool,
  mobilization: PropTypes.shape({
    twitter_share_text: PropTypes.string
  }).isRequired,
  widget: PropTypes.shape({
    settings: PropTypes.shape({
      whatsapp_text: PropTypes.string
    })
  }).isRequired,
  message: PropTypes.string.isRequired,
  href: PropTypes.string.isRequired,
  imageUrl: PropTypes.string,
  imageWidth: PropTypes.string
}

TellAFriend.defaultProps = {
  imageUrl: require('exenv').canUseDOM ? require('./check-mark-image.png') : null
}

export default TellAFriend
