import React, { PropTypes } from 'react'
import $ from 'jquery'

export default class NavbarButton extends React.Component {
  static propTypes = {
    targetId: PropTypes.string.isRequired,
    className: PropTypes.string,
    children: PropTypes.array
  }

  handleClick(e) {
    e.preventDefault()
    const {targetId} = this.props
    const yPosition = $(`#${targetId}`).position().top

    $('body').animate({scrollTop: yPosition}, 500, () => {
      window.location.hash = targetId
    })
  }

  render() {
    const {className, children} = this.props

    return (
      <a className={className} onClick={::this.handleClick}>{children}</a>
    )
  }
}
