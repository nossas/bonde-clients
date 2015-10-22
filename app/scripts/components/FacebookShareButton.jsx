import React, { PropTypes } from 'react'

export default class FacebookShareButton extends React.Component {
  handleClick () {
    const { href } = this.props

    window.open(
      `http://www.facebook.com/sharer.php?u=${href}`,
      'Compartilhar no Facebook',
      'height=600,width=800'
    )
  }

  render () {
    return (
      <button
        className='button h3 p3 full-width caps h5 not-rounded'
        onClick={::this.handleClick}
        style={{backgroundColor: '#2D88ED'}}>
        Compartilhe no Facebook
      </button>
    )
  }
}
