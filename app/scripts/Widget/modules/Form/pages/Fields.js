import React from 'react'
import { bindActionCreators } from 'redux'
import * as WidgetActions from './../../../actions'
import { Loading, CloseButton } from './../../../../components'
import { Menu, FormWidget } from './../components'
import * as Paths from './../../../../Paths'

export default class Fields extends React.Component {
  constructor(props, context) {
    super(props, context)
    this.state = {
      loading: false,
      hasNewField: false
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.state.loading && this.widget() != this.widget(nextProps)) {
      this.setState({loading: false, hasNewField: true})
    } else {
      this.setState({hasNewField: false})
    }
  }

  handleAddTextField() {
    this.addField('text')
  }

  widget(props = this.props) {
    const { widgets } = props
    return widgets.data[widgets.data.map((widget) => { return widget.id.toString()}).indexOf(this.props.params.widget_id)]
  }

  fields() {
    const { settings } = this.widget()
    return (settings && settings.fields ? settings.fields : [])
  }

  addField(kind) {
    const { dispatch, mobilization, auth } = this.props
    const widget = this.widget()
    const { settings } = widget
    const fields = this.fields()
    const bindedWidgetActions = bindActionCreators(WidgetActions, dispatch)
    this.setState({loading: true})
    bindedWidgetActions.editWidget({
      mobilization_id: mobilization.id,
      widget_id: widget.id,
      credentials: auth.credentials,
      widget: { settings: {...settings, fields: [...fields, {
        uid: ('field-' + Date.now().toString() + '-' + Math.floor((Math.random() * 100) + 1)),
        kind: 'text',
        label: '',
        placeholder: '',
        required: 'false'
      }]} }
    })
  }

  renderFields() {
    const widget = this.widget()
    return(
      <div className="flex-auto flex flex-column bg-silver gray relative">
        <Menu {...this.props} widget={widget} />
        <div className="p3 flex-auto overflow-scroll">
          <p className="h5 mb3">
            { this.fields().length == 0 ? 'Seu formulário ainda não possui nenhum campo. Clique abaixo para começar a adicionar campos.' : 'Adicione, remova, edite e ordene os campos do formulário de acordo com as necessidades da sua ação.' }
          </p>
          <FormWidget {...this.props} widget={widget} configurable={true} hasNewField={this.state.hasNewField} />
          <button className="button bg-aqua caps p2" onClick={::this.handleAddTextField}>
            <i className="fa fa-plus mr2" />
            Adicionar um campo
          </button>
        </div>
        { this.renderLoading() }
        <CloseButton dirty={false} path={Paths.editMobilization(this.props.mobilization.id)} />
      </div>
    )
  }

  renderLoading(){
    if(this.state.loading || this.props.widgets.data.length == 0) {
      return(
        <Loading />
      )
    }
  }

  render() {
    return(this.props.widgets.data.length > 0 ? this.renderFields() : this.renderLoading())
  }
}
