import React from 'react'
import { bindActionCreators } from 'redux'
import * as WidgetActions from './../actions/WidgetActions'

export default class FormWidgetButton extends React.Component {
  handleClick() {
    if(!this.props.editable) {
      // TODO submit the form
    }
  }

  render() {
    return(
      <div>
        <button className="caps button bg-darken-4 p2 full-width mt1" onClick={::this.handleClick}>
          {this.props.buttonText}
        </button>
      </div>
    )
  }
}
