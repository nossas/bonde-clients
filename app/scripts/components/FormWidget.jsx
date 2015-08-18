import React from 'react'
import classnames from 'classnames'
import { FormWidgetInput, FormWidgetButton, Loading } from './'
import { bindActionCreators } from 'redux'
import * as WidgetActions from './../actions/WidgetActions'

export default class FormWidget extends React.Component {
  constructor(props, context) {
    super(props, context)
    this.state = {
      editing: false,
      loading: false
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.state.loading && this.props.widget != nextProps.widget) {
      this.setState({loading: false})
    }
  }

  handleCancelEdit(){
    this.setState({editing: false})
    this.props.onCancelEdit && this.props.onCancelEdit()
  }

  handleEdit() {
    this.setState({editing: true})
    this.props.onEdit && this.props.onEdit()
  }

  handleAddTextField() {
    this.addField('text')
  }

  fields() {
    const { settings } = this.props.widget
    return (settings && settings.fields ? settings.fields : [])
  }

  addField(kind) {
    const { dispatch, mobilization, widget } = this.props
    const { settings } = widget
    const fields = this.fields()
    const bindedWidgetActions = bindActionCreators(WidgetActions, dispatch)
    this.setState({loading: true})
    bindedWidgetActions.editWidget({
      mobilization_id: mobilization.id,
      widget_id: widget.id,
      widget: { settings: {...settings, fields: [...fields, {
        uid: ('field-' + Date.now().toString() + '-' + Math.floor((Math.random() * 100) + 1)), 
        kind, 
        label: 'Título',
        placeholder: 'Preencha as instruções',
        required: 'false'
      }]} }
    })
  }

  renderToolbar(){
    if(this.state.editing) {
      return(
        <div>
          <div className="absolute full-width top-0 left-0 bg-darken-4" style={{zIndex: 9999}}>
            <button className="button button-transparent white p2" onClick={::this.handleAddTextField}>
              <i className="fa fa-plus mr2" />
              Campo de texto
            </button>
          </div>
          <div
            className="fixed top-0 right-0 bottom-0 left-0"
            onClick={::this.handleCancelEdit}
            style={{zIndex: 9998}} />
        </div>
      )
    }
  }

  renderInstructions() {
    if(this.props.editable && this.fields().length == 0) {
      return (
        <p>Clique para personalizar seu formulário...</p>
      )
    }
  }

  renderLoading() {
    if (this.state.loading) {
      return (
        <Loading />
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

  render() {
    const { editable, widget } = this.props
    return(
      <div>
        { this.renderToolbar() }
        <div className={classnames("widget", (editable ? 'border p2' : null))} style={(editable ? {borderStyle: 'dashed'} : null)} onClick={::this.handleEdit}>
          { this.renderInstructions() }
          { this.renderFields() }
          <FormWidgetButton buttonText={(widget.settings ? (widget.settings.button_text || 'Enviar') : 'Enviar')} {...this.props} />
        </div>
        { this.renderLoading() }
      </div>
    )
  }
}
