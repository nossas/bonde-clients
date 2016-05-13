import React, { PropTypes } from 'react'
import * as Paths from './../../Paths'
import { FacebookShareButton, TwitterShareButton } from './../'

export default class TellAFriend extends React.Component {
  static propTypes = {
    mobilization: PropTypes.object.isRequired,
    message: PropTypes.string.isRequired
  }

  render() {
    const checkMarkImage = require('./checkMarkImage.png')
    const { message, mobilization } = this.props

    return (
      <div className='center p3 bg-white black'>
        <div className='m0 h3 bold'>{ message }</div>
        <div className='py2'>
          <img src={checkMarkImage} style={{width: '100px'}} />
        </div>
        <p>Agora, compartilhe com seus amigos!</p>
        <p><FacebookShareButton href={Paths.mobilization(mobilization)} /></p>
        <p><TwitterShareButton href={Paths.mobilization(mobilization)} text={mobilization.twitter_share_text} /></p>
      </div>
    )
  }
}
