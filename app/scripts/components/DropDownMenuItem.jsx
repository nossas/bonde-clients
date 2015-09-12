import React, { PropTypes } from 'react'
import classnames from 'classnames'

export default class DropDownMenuItem extends React.Component {
  static propTypes = {
    href: PropTypes.string,
    children: PropTypes.object,
    onClick: PropTypes.func,
    onItemClick: PropTypes.func,
    disabled: PropTypes.bool
  }

  handleClick(event) {
    (this.props.onClick || this.props.disabled) && event.preventDefault()
    if (!this.props.disabled) {
      this.props.onItemClick && this.props.onItemClick()
      this.props.onClick && this.props.onClick()
    }
  }

  render() {
    return (
      <a
        className={classnames('button button-transparent full-width left-align block', (this.props.disabled ? 'muted' : ''))}
        disabled={this.props.disabled}
        onClick={::this.handleClick}
        href={this.props.href}>
        {this.props.children}
      </a>
    )
  }
}
