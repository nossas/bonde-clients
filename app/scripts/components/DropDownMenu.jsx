import React, { PropTypes } from 'react'
import classnames from 'classnames'

export default class DropDownMenuItem extends React.Component {
  static propTypes = {
    icon: PropTypes.string.isRequired,
    className: PropTypes.string,
    menuClassName: PropTypes.string,
    text: PropTypes.string,
    children: PropTypes.array
  }

  constructor(props, context) {
    super(props, context)
    this.state = { open: false }
  }

  handleClick() {
    this.setState({open: !this.state.open})
  }

  handleOverlayClick() {
    this.setState({open: false})
  }

  renderIcon() {
    if (this.props.icon) {
      return (
        <i className={classnames('fa', 'fa-' + this.props.icon)} />
      )
    }
  }

  renderOverlay() {
    if (this.state.open) {
      return (
        <div
          className="fixed top-0 right-0 bottom-0 left-0 z1"
          onClick={::this.handleOverlayClick}/>
      )
    }
  }

  renderChildren() {
    return this.props.children.map((child, index) => {
      return React.cloneElement(child, {
        key: 'item-' + index,
        onItemClick: ::this.handleOverlayClick
      })
    })
  }

  render() {
    return (
      <div className={classnames(this.props.className)}>
        <button className={classnames('button', this.props.menuClassName)} onClick={::this.handleClick}>
          {this.renderIcon()} {this.props.text}
        </button>
        <div className={classnames('absolute right-0 mt1 mr1 nowrap z2', this.props.menuClassName, (this.state.open ? '' : 'display-none'))}>
          { this.props.children.length > 0 && this.renderChildren() }
        </div>
        { this.renderOverlay() }
      </div>
    )
  }
}
