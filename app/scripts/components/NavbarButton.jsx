import React, { PropTypes } from 'react'
import $ from 'jquery'

export default class NavbarButton extends React.Component {
  static propTypes = {
    targetId: PropTypes.string.isRequired,
    scrollableId: PropTypes.string.isRequired,
    className: PropTypes.string,
    children: PropTypes.array
  }

  handleClick(e) {
    e.preventDefault()
    const { targetId, scrollableId } = this.props
    const target = $(`#${targetId}`)
    const scrollable = $(`#${scrollableId}`)
    const yPosition = target.position().top + scrollable.scrollTop() - scrollable.position().top

    scrollable.animate({scrollTop: yPosition}, 500, () => {
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
