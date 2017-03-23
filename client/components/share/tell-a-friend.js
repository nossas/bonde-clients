import React, { PropTypes } from 'react'

import { FacebookShareButton, TwitterShareButton, WhatsAppShareButton } from '~components/share'

const TellAFriend = ({ preview, href, message, mobilization, imageUrl, imageWidth }) => (
  <div className='center p3 bg-white darkengray rounded'>
    <div className='m0 h3 bold'>{message}</div>
    <div className='py2'>
      <img src={imageUrl} style={{ width: imageWidth || 100 }} />
    </div>
    <p>Agora, compartilhe com seus amigos!</p>
    <p><FacebookShareButton href={href} /></p>
    <p><TwitterShareButton href={href} text={mobilization.twitter_share_text} /></p>
    <p><WhatsAppShareButton href={href} preview={preview} /></p>
  </div>
)

TellAFriend.propTypes = {
  preview: PropTypes.bool,
  mobilization: PropTypes.object.isRequired,
  message: PropTypes.string.isRequired,
  href: PropTypes.string.isRequired,
  imageUrl: PropTypes.string,
  imageWidth: PropTypes.string
}

TellAFriend.defaultProps = {
  imageUrl: require('exenv').canUseDOM ? require('./check-mark-image.png') : null
}

export default TellAFriend
