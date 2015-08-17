import React from 'react'
import classnames from 'classnames'
import { Loading } from './'
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
    const { settings } = this.props.widget
    const fields = this.fields()
    const { dispatch } = this.props
    const bindedWidgetActions = bindActionCreators(WidgetActions, dispatch)
    this.setState({loading: true})
    bindedWidgetActions.editWidget({
      mobilization_id: this.props.mobilization.id,
      widget_id: this.props.widget.id,
      widget: { settings: {...settings, fields: [...fields, {kind, name: 'Título'}]} }
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
    return this.fields().map(function(field, index){
      return(
        <div className="mb2" key={'field-' + index}>
          <label className="block h6 caps bold mb1">{field.name}</label>
          <input 
            className="field-light block full-width"
            type={field.kind}/>
        </div>
      )
    }.bind(this))
  }

  render() {
    const { editable } = this.props
    return(
      <div>
        { this.renderToolbar() }
        <div className={classnames("widget", (editable ? 'border p2' : null))} style={(editable ? {borderStyle: 'dashed'} : null)} onClick={::this.handleEdit}>
          { this.renderInstructions() }
          { this.renderFields() }
          <button className="caps button bg-darken-4 p2 full-width">
            Enviar
          </button>
        </div>
        { this.renderLoading() }
      </div>
    )
  }
}
