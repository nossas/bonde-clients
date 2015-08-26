import React from 'react'
import { bindActionCreators } from 'redux'
import * as WidgetActions from './../actions/WidgetActions'

export default class FormWidgetButton extends React.Component {
  // handleSave(event) {
  //   event.stopPropagation()
  //   const { dispatch, mobilization, widget } = this.props
  //   const { settings } = widget
  //   const bindedWidgetActions = bindActionCreators(WidgetActions, dispatch)
  //   this.setState({
  //     loading: true,
  //     editing: false
  //   })
  //   this.props.onCancelEdit && this.props.onCancelEdit()
  //   bindedWidgetActions.editWidget({
  //     mobilization_id: mobilization.id,
  //     widget_id: widget.id,
  //     widget: { settings: {...settings, button_text: this.state.buttonText} }
  //   })
  // }

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
