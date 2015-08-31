import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as WidgetActions from './../actions/WidgetActions'
import { FormWidgetMenu, FormWidget, Loading, CloseButton } from './../components'
import * as Paths from '../Paths'

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
      <div className="flex-auto bg-silver gray relative">
        <FormWidgetMenu {...this.props} widget={widget} />
        <div className="py3 px3">
          <p className="h5 mb3">
            Adicione, remova, edite e ordene os campos de acordo com as necessidades da sua ação.
          </p>
          { this.fields().length == 0 && <div className="mb3">Seu formulário ainda não possui nenhum campo. Clique abaixo para começar a adicionar campos.</div>}
          <FormWidget {...this.props} widget={widget} configurable={true} />
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
