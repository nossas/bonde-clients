import React from 'react'
import classnames from 'classnames'

export default class DropDownMenuItem extends React.Component {
  handleClick(event){
    (this.props.onClick || this.props.disabled) && event.preventDefault()
    if(!this.props.disabled) {
      this.props.onItemClick && this.props.onItemClick()
      this.props.onClick && this.props.onClick()
    }
  }

  render(){
    return(
      <a className={classnames("button button-transparent full-width left-align block", (this.props.disabled ? 'muted' : ''))} disabled={this.props.disabled} onClick={::this.handleClick} href={this.props.href}>{this.props.children}</a>
    )
  }
}
