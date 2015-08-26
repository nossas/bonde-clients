import React from 'react'
import classnames from 'classnames'
import { FormWidgetInput, FormWidgetButton } from './'
import { bindActionCreators } from 'redux'
import * as WidgetActions from './../actions/WidgetActions'
import reactMixin from 'react-mixin'
import { Navigation } from 'react-router'
import * as Paths from '../Paths'

@reactMixin.decorate(Navigation)

export default class FormWidget extends React.Component {
  fields() {
    const { settings } = this.props.widget
    return (settings && settings.fields ? settings.fields : [])
  }

  handleClick() {
    const {mobilization, widget} = this.props
    if(this.props.editable) {
      this.transitionTo(Paths.fieldsMobilizationWidget(mobilization.id, widget.id))
    }
  }

  renderInstructions() {
    if(this.props.editable && this.fields().length == 0) {
      return (
        <h4 className="mb2">Clique para personalizar seu formulário...</h4>
      )
    }
  }

  renderFields() {
    const fields = this.fields()
    return fields.map((field, index) => {
      return(
        <FormWidgetInput
          {...this.props}
          key={field.uid}
          canMoveUp={index != 0}
          canMoveDown={index != fields.length - 1}
          field={field} />
      )
    }.bind(this))
  }

  renderButton() {
    const { configurable, widget } = this.props
    if(!configurable) {
      return(
        <FormWidgetButton buttonText={(widget.settings ? (widget.settings.button_text || 'Enviar') : 'Enviar')} {...this.props} />
      )
    }
  }

  render() {
    const { editable } = this.props
    return(
      <div>
        <div className={classnames("widget", (editable ? 'border p2' : null))} style={(editable ? {borderStyle: 'dashed', cursor: 'pointer'} : null)} onClick={::this.handleClick}>
          { this.renderInstructions() }
          { this.renderFields() }
          { this.renderButton() }
        </div>
      </div>
    )
  }
}
