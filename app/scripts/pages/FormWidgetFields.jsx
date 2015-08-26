import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as WidgetActions from './../actions/WidgetActions'
import { FormWidgetMenu, FormWidget, Loading } from './../components'

@connect(state => ({
  widgets: state.widgets
}))

export default class FormWidgetFields extends React.Component {
  constructor(props, context) {
    super(props, context)
    this.state = {
      loading: false
    }
  }

  componentDidMount(){
    const { mobilization, dispatch } = this.props
    const bindedWidgetActions = bindActionCreators(WidgetActions, dispatch)
    bindedWidgetActions.fetchWidgets({mobilization_id: mobilization.id})
  }

  componentWillReceiveProps(nextProps) {
    if (this.state.loading && this.widget() != this.widget(nextProps)) {
      this.setState({loading: false})
    }
  }

  handleAddTextField() {
    this.addField('text')
  }

  widget(props = this.props) {
    const { widgets } = props
    return widgets[widgets.map((widget) => { return widget.id.toString()}).indexOf(this.props.params.widget_id)]
  }

  fields() {
    const { settings } = this.widget()
    return (settings && settings.fields ? settings.fields : [])
  }

  addField(kind) {
    const { dispatch, mobilization } = this.props
    const widget = this.widget()
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
        label: 'Título do campo',
        placeholder: 'Preencha o texto de apoio',
        required: 'false'
      }]} }
    })
  }

  renderFields() {
    const widget = this.widget()
    return(
      <div className="flex-auto bg-silver gray">
        <FormWidgetMenu {...this.props} widget={widget} />
        <div className="py3 px3">
          <p className="h5 mb3">
            Adicione, remova, edite e ordene os campos de acordo com as necessidades da sua ação.
          </p>
          <FormWidget {...this.props} widget={widget} configurable={true} />
          <button className="button bg-aqua caps p2" onClick={::this.handleAddTextField}>
            <i className="fa fa-plus mr2" />
            Adicionar um campo
          </button>
        </div>
        { this.renderLoading() }
      </div>
    )
  }

  renderLoading(){
    if(this.state.loading || this.props.widgets.length == 0) {
      return(
        <Loading />
      )
    }
  }

  render() {
    return(this.props.widgets.length > 0 ? this.renderFields() : this.renderLoading())
  }
}
