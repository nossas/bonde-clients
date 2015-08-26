import React from 'react'
import classnames from 'classnames'
import { Loading } from './'
import { bindActionCreators } from 'redux'
import * as WidgetActions from './../actions/WidgetActions'

export default class FormWidgetInput extends React.Component {
  constructor(props, context) {
    super(props, context)
    const { field } = this.props
    this.state = {
      hasMouseOver: false,
      editing: false,
      loading: false,
      kind: field.kind,
      label: field.label,
      placeholder: field.placeholder,
      required: field.required
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.state.loading && this.props.field != nextProps.field) {
      this.setState({loading: false})
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

  handleLabelChange(event) {
    this.setState({label: event.target.value})
  }

  handlePlaceholderChange(event) {
    this.setState({placeholder: event.target.value})
  }

  handleRequiredChange(event) {
    this.setState({required: event.target.value})
  }

  handleKindChange(event) {
    this.setState({kind: event.target.value})
  }

  updateSettings(newFields) {
    const { dispatch, mobilization, widget } = this.props
    const { settings } = widget
    const { fields } = settings
    const bindedWidgetActions = bindActionCreators(WidgetActions, dispatch)
    this.setState({
      loading: true,
      editing: false
    })
    this.props.onCancelEdit && this.props.onCancelEdit()
    bindedWidgetActions.editWidget({
      mobilization_id: mobilization.id,
      widget_id: widget.id,
      widget: { settings: {
        ...settings, 
        fields: newFields
      } }
    })
  }

  handleCancel(event) {
    event.stopPropagation()
    const { field } = this.props
    this.setState({
      editing: false,
      kind: field.kind,
      label: field.label,
      placeholder: field.placeholder,
      required: field.required
    })
  }

  handleSave(event) {
    event.stopPropagation()
    const { fields } = this.props.widget.settings
    const newFields = fields.map((field) => {
      if(field.uid == this.props.field.uid) {
        return {
          uid: field.uid,
          kind: this.state.kind,
          label: this.state.label,
          placeholder: this.state.placeholder,
          required: this.state.required
        }
      } else {
        return field
      }
    })
    this.updateSettings(newFields)
  }

  handleMoveUp(event) {
    event.stopPropagation()
    const { fields } = this.props.widget.settings
    const newFields = fields.map((field, index) => {
      if (index + 1 < fields.length && fields[index + 1].uid == this.props.field.uid) {
        return this.props.field
      } else if (field.uid == this.props.field.uid) {
        return fields[index - 1]
      } else {
        return field
      }
    })
    this.updateSettings(newFields)
  }

  handleMoveDown(event) {
    event.stopPropagation()
    const { fields } = this.props.widget.settings
    const newFields = fields.map((field, index) => {
      if (index > 0 && fields[index - 1].uid == this.props.field.uid) {
        return this.props.field
      } else if (field.uid == this.props.field.uid) {
        return fields[index + 1]
      } else {
        return field
      }
    })
    this.updateSettings(newFields)
  }

  handleRemove(event) {
    event.stopPropagation()
    if (confirm("Você tem certeza que quer remover este campo?")) {
      const { fields } = this.props.widget.settings
      const newFields = fields.filter(field =>
        field.uid != this.props.field.uid
      )
      this.updateSettings(newFields)
    }
  }

  renderForm(){
    const { canMoveUp, canMoveDown } = this.props
    return(
      <div className="border p2 mb3 bg-white clearfix">
        <div className="col col-6">
          <div className="flex flex-center mb2">
            <div className="col col-4">
              <label className="h5 bold">Título do campo</label>
            </div>
            <div className="col col-8">
              <input 
                className="field-light block full-width"
                style={{height: '52px'}}
                type="text"
                value={this.state.label}
                onChange={::this.handleLabelChange} />
            </div>
          </div>
          <div className="flex flex-center mb2">
            <div className="col col-4">
              <label className="h5 bold">Texto de apoio</label>
            </div>
            <div className="col col-8">
              <input 
                className="field-light block full-width"
                style={{height: '52px'}}
                type="text"
                value={this.state.placeholder}
                onChange={::this.handlePlaceholderChange} />
            </div>
          </div>
          <div className="flex flex-center mb2">
            <div className="col col-4">
              <label className="h5 bold">Tipo de campo</label>
            </div>
            <div className="col col-8">
              <select 
                className="field-light block full-width"
                style={{height: '52px'}}
                onChange={::this.handleKindChange}
                value={this.state.kind}>
                <option value="text">Texto</option>
                <option value="email">E-mail</option>
                <option value="number">Número</option>
              </select>
            </div>
          </div>
          <div className="flex flex-center mb2">
            <div className="col col-4">
              <label className="h5 bold">Obrigatório</label>
            </div>
            <div className="col col-8">
              <select 
                className="field-light mr3"
                style={{height: '52px'}}
                onChange={::this.handleRequiredChange}
                value={this.state.required}>
                <option value="false">Não</option>
                <option value="true">Sim</option>
              </select>
            </div>
          </div>
        </div>
        <div className="col col-6 px2">
          <div>
            <button disabled={!canMoveUp} className="button button-transparent p2 mr1" onClick={::this.handleMoveUp}>
              <i className="fa fa-chevron-up mr1" />
              Mover para cima
            </button>
          </div>
          <div>
            <button disabled={!canMoveDown} className="button button-transparent p2 mr1" onClick={::this.handleMoveDown}>
              <i className="fa fa-chevron-down mr1" />
              Mover para baixo
            </button>
          </div>
          <div>
            <button className="button button-transparent p2" onClick={::this.handleRemove}>
              <i className="fa fa-trash mr1" />
              Remover
            </button>
          </div>
          <div className="mt2">
            <button className="button caps bg-darken-3 p2 mr2" onClick={::this.handleCancel}>
              Cancelar
            </button>
            <button className="button caps bg-aqua p2 mr2" onClick={::this.handleSave}>
              Salvar
            </button>
          </div>
        </div>
      </div>
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
      <div className="mb3" onMouseOver={::this.handleMouseOver} onMouseOut={::this.handleMouseOut} style={(editable || configurable ? {cursor: 'pointer'} : null)} onClick={::this.handleClick}>
        <label className="block h4 caps bold mb1 left" style={(editable || configurable ? {cursor: 'pointer'} : null)}>{field.label}</label>
        { this.renderInstructions() }
        <input 
          className="field-light block full-width h3"
          style={(editable || configurable ? {cursor: 'pointer'} : null)}
          placeholder={field.placeholder}
          type={field.kind}/>
        { this.renderLoading() }
      </div>
    )
  }

  renderLoading() {
    if (this.state.loading) {
      return (
        <Loading />
      )
    }
  }

  render() {
    return(this.state.editing ? this.renderForm() : this.renderInput())
  }
}
