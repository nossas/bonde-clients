import React from 'react'
import * as ReactAddons from 'react/addons'
import classnames from 'classnames'
import { FormWidgetInputForm } from './'
const ReactTransitionGroup = ReactAddons.addons.TransitionGroup

export default class FormWidgetInput extends React.Component {
  constructor(props, context) {
    super(props, context)
    const { field } = this.props
    this.state = {
      hasMouseOver: false,
      editing: false
    }
  }

  handleMouseOver() {
    this.setState({hasMouseOver: true})
  }

  handleMouseOut() {
    this.setState({hasMouseOver: false})
  }

  handleClick(event) {
    if(this.props.configurable) {
      event.stopPropagation()
      event.preventDefault()
      this.setState({editing: true})
    }
  }

  handleCloseForm() {
    this.setState({editing: false})
  }

  renderForm(){
    const { uid } = this.props
    return (
      <ReactTransitionGroup>
        <FormWidgetInputForm {...this.props} onClose={::this.handleCloseForm} key={'form-' + uid} />
      </ReactTransitionGroup>
    )
  }

  renderInstructions() {
    const { configurable } = this.props
    if(configurable && this.state.hasMouseOver) {
      return(
        <div className="right">
          <i className="fa fa-pencil-square-o mr1" />
          Clique para editar
        </div>
      )
    }
  }

  renderInput() {
    const { field, editable, configurable } = this.props

    return(
      <div className="mb3" onMouseEnter={::this.handleMouseOver} onMouseLeave={::this.handleMouseOut} style={(editable || configurable ? {cursor: 'pointer'} : null)} onClick={::this.handleClick}>
        <label className="block h4 caps bold mb1 left" style={(editable || configurable ? {cursor: 'pointer'} : null)}>{field.label}</label>
        { this.renderInstructions() }
        <input 
          className="field-light block full-width h3"
          style={(editable || configurable ? {cursor: 'pointer'} : null)}
          placeholder={field.placeholder}
          type={field.kind}/>
      </div>
    )
  }

  render() {
    return(this.state.editing ? this.renderForm() : this.renderInput())
  }
}
