import React from 'react'
import classnames from 'classnames'

export default class DropDownMenuItem extends React.Component {
  constructor(props, context) {
    super(props, context)
    this.state = { open: false }
  }

  handleClick() {
    this.setState({open: !this.state.open})
  }

  handleOverlayClick(){
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
          className="fixed top-0 right-0 bottom-0 left-0"
          onClick={::this.handleOverlayClick}
          style={{zIndex: 9998}} />
      )
    }
  }

  renderChildren() {
    if (this.props.children.length > 0) {
      return this.props.children.map((child, index) => {
        return React.cloneElement(child, {key: 'item-' + index, onItemClick: ::this.handleOverlayClick})
      })
    } else {
      return React.cloneElement(this.props.children, {onItemClick: ::this.handleOverlayClick})
    }
  }

  render(){
    return(
      <div className="relative inline-block">
        <button className="button white bg-darken-4" onClick={::this.handleClick}>
          {this.renderIcon()} {this.props.text} &#9662;
        </button>
        <div className={classnames("absolute right-0 mt1 nowrap white bg-darken-4 rounded", (this.state.open ? "" : "display-none"))} style={{zIndex: 9999}}>
          { this.renderChildren() }
        </div>
        { this.renderOverlay() }
      </div>
    )
  }
}
