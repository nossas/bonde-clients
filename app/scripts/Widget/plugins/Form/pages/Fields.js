import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import * as Paths from './../../../../Paths'
import * as WidgetActions from './../../../actions'
import { Loading, CloseButton } from './../../../../components'
import FormWidget from './../'
import { Menu } from './../components'


class Fields extends Component {

  constructor(props, context) {
    super(props, context)
    this.state = { loading: false, hasNewField: false }
  }

  componentWillReceiveProps(nextProps) {
    const { widget } = this.props
    if (this.state.loading && widget != this.widget(nextProps)) {
      this.setState({ loading: false, hasNewField: true })
    } else {
      this.setState({ hasNewField: false })
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
    const { widget: { settings } } = this.props
    return (settings && settings.fields ? settings.fields : [])
  }

  addField(kind) {
    const { mobilization, widget, credentials, editWidgetAsync, dispatch, ...props } = this.props
    const { settings } = widget
    const fields = this.fields()
    this.setState({ loading: true })

    const data = {
      ...widget,
      settings: {
        ...settings,
        fields: [
          ...fields,
          {
            uid: ('field-' + Date.now().toString() + '-' + Math.floor((Math.random() * 100) + 1)),
            kind: 'text',
            label: '',
            placeholder: '',
            required: 'false'
          }
        ]
      }
    }
    editWidgetAsync(data)
  }

  renderFields() {
    const { widget, ...props } = this.props
    return(
      <div className="flex-auto flex flex-column bg-silver gray relative">
        <Menu widget={widget} {...props} />
        <div className="p3 flex-auto overflow-scroll">
          <p className="h5 mb3">
            { this.fields().length == 0 ? 'Seu formulário ainda não possui nenhum campo. Clique abaixo para começar a adicionar campos.' : 'Adicione, remova, edite e ordene os campos do formulário de acordo com as necessidades da sua ação.' }
          </p>
          <FormWidget widget={widget} configurable={true} hasNewField={this.state.hasNewField} {...props} />
          <button className="button bg-aqua caps p2" onClick={::this.handleAddTextField}>
            <i className="fa fa-plus mr2" />
            Adicionar um campo
          </button>
        </div>
        { this.renderLoading() }
        <CloseButton dirty={false} path={Paths.editMobilization(props.mobilization.id)} />
      </div>
    )
  }

  renderLoading(){
    if(this.state.loading || this.props.widget === undefined) {
      return(
        <Loading />
      )
    }
  }

  render() {
    const { widget, ...props } = this.props
    return(widget !== undefined ? this.renderFields() : this.renderLoading())
  }
}

Fields.propTypes = {
  mobilization: PropTypes.object.isRequired,
  widget: PropTypes.object.isRequired,
  credentials: PropTypes.object.isRequired,
  editWidgetAsync: PropTypes.func.isRequired
}

export default connect(
(state, ownProps) => {
  return {
    credentials: state.auth.credentials,
  }
}, { ...WidgetActions })(Fields)
