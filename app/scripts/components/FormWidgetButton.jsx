import React from 'react'
import { Loading } from './'
import { bindActionCreators } from 'redux'
import * as WidgetActions from './../actions/WidgetActions'

export default class FormWidgetButton extends React.Component {
  constructor(props, context) {
    super(props, context)
    this.state = {
      editing: false,
      loading: false,
      buttonText: this.props.buttonText
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.state.loading && this.props.widget != nextProps.widget) {
      this.setState({loading: false})
    }
  }

  handleCancelEdit(event){
    event.stopPropagation()
    this.setState({editing: false})
    this.props.onCancelEdit && this.props.onCancelEdit()
  }

  handleEdit(event) {
    event.stopPropagation()
    if(this.props.editable) {
      this.setState({editing: true})
      this.props.onEdit && this.props.onEdit()
    }
  }

  handleChange(event) {
    this.setState({buttonText: event.target.value})
  }

  handleToolbarClick(event) {
    event.stopPropagation()
  }

  handleSave(event) {
    event.stopPropagation()
    const { dispatch, mobilization, widget } = this.props
    const { settings } = widget
    const bindedWidgetActions = bindActionCreators(WidgetActions, dispatch)
    this.setState({
      loading: true,
      editing: false
    })
    this.props.onCancelEdit && this.props.onCancelEdit()
    bindedWidgetActions.editWidget({
      mobilization_id: mobilization.id,
      widget_id: widget.id,
      widget: { settings: {...settings, button_text: this.state.buttonText} }
    })
  }

  renderToolbar(){
    if(this.state.editing) {
      return(
        <div onClick={::this.handleToolbarClick}>
          <div className="absolute full-width top-0 left-0 bg-darken-4" style={{zIndex: 9999}}>
            <div className="p2">
              <label className="h4 block caps bold mb1">Texto do botão</label>
              <input 
              className="field-light p2 mr2"
              style={{height: '50px'}}
              type="text"
              value={this.state.buttonText}
              onChange={::this.handleChange} />
              <button className="button caps bg-darken-4 py2" onClick={::this.handleSave}>
                Salvar
              </button>
            </div>
          </div>
          <div
            className="fixed top-0 right-0 bottom-0 left-0"
            onClick={::this.handleCancelEdit}
            style={{zIndex: 9998}} />
        </div>
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

  render() {
    return(
      <div>
        { this.renderToolbar() }
        <button className="caps button bg-darken-4 p2 full-width mt1" onClick={::this.handleEdit}>
          {this.props.buttonText}
        </button>
        { this.renderLoading() }
      </div>
    )
  }
}
