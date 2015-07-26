import React from 'react'
import classnames from 'classnames'

export default class DropDownMenuItem extends React.Component {
  handleClick(event){
    event.preventDefault()
    if(!this.props.disabled) {
      this.props.onItemClick()
      this.props.onClick()
    }
  }

  render(){
    return(
      <a className={classnames("button button-transparent full-width left-align block", (this.props.disabled ? 'gray' : ''))} disabled={this.props.disabled} onClick={::this.handleClick}>{this.props.children}</a>
    )
  }
}
