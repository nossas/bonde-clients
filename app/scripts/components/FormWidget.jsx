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
  constructor(props, context) {
    super(props, context)
    this.state = {
      hasMouseOver: false
    }
  }

  fields() {
    const { settings } = this.props.widget
    return (settings && settings.fields ? settings.fields : [])
  }

  handleMouseEnter() {
    this.setState({hasMouseOver: true})
  }

  handleMouseLeave() {
    this.setState({hasMouseOver: false})
  }

  handleClick() {
    const {mobilization, widget} = this.props
    if(this.props.editable) {
      this.transitionTo(Paths.fieldsMobilizationWidget(mobilization.id, widget.id))
    }
  }

  renderCallToAction() {
    const { configurable, widget } = this.props
    if(!configurable) {
      return (
        <h2 className="mt0 mb3 center">{widget.settings && widget.settings.call_to_action ? widget.settings.call_to_action : 'Clique para configurar seu formulário...'}</h2>
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

  renderCount() {
    const { configurable, widget } = this.props
    if(!configurable) {
      return(
        <div className="mt2 h3 center">
          0
          &nbsp;
          {widget.settings && widget.settings.count_text ? widget.settings.count_text : 'assinaturas'}
        </div>
      )
    }
  }

  renderOverlay() {
    if(this.state.hasMouseOver) {
      return(
        <div
          className="absolute top-0 right-0 bottom-0 left-0 bg-darken-4 h1 bold flex flex-center"
          style={{zIndex: 9998}}>
          <div className="center full-width white">Clique para editar</div>
        </div>
      )
    }
  }

  render() {
    const { editable } = this.props
    return(
      <div>
        <div
          className={classnames("widget relative", (editable ? 'border p2' : null))}
          style={(editable ? {borderStyle: 'dashed', cursor: 'pointer'} : null)}
          onMouseEnter={::this.handleMouseEnter}
          onMouseLeave={::this.handleMouseLeave}
          onClick={::this.handleClick}>
          { this.renderCallToAction() }
          { this.renderFields() }
          { this.renderButton() }
          { this.renderCount() }
          { this.renderOverlay() }
        </div>
      </div>
    )
  }
}
