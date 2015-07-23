import React from 'react'

export default class DropDownMenuItem extends React.Component {
  handleClick(){
    this.props.onItemClick()
    this.props.onClick()
  }

  render(){
    return(
      <button className="button button-transparent full-width left-align block" disabled={this.props.disabled} onClick={::this.handleClick}>{this.props.children}</button>
    )
  }
}
