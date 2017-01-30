import React, { PropTypes } from 'react'
import AnalyticsEvents from '../../modules/widgets/utils/analytics-events'

export default class FacebookShareButton extends React.Component {
  static propTypes = {
    href: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired
  }

  handleClick() {
    const { text, href } = this.props

    AnalyticsEvents.socialShared('Facebook', text)

    window.open(
      `http://www.facebook.com/sharer.php?u=${href}`,
      'Compartilhar no Facebook',
      'width=800,height=600'
    )
  }

  render() {
    return (
      <button
        ref="button"
        className="btn white h3 p3 col-12 caps h5 rounded"
        onClick={::this.handleClick}
        style={{ backgroundColor: '#2D88ED' }}
      >
        Compartilhar no Facebook
      </button>
    )
  }
}
