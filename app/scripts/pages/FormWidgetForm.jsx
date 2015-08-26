import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as WidgetActions from './../actions/WidgetActions'
import { FormWidgetMenu, Loading } from './../components'

@connect(state => ({
  widgets: state.widgets
}))

export default class FormWidgetForm extends React.Component {
  componentDidMount(){
    const { mobilization, dispatch } = this.props
    const bindedWidgetActions = bindActionCreators(WidgetActions, dispatch)
    bindedWidgetActions.fetchWidgets({mobilization_id: mobilization.id})
  }

  renderFields() {
    const { widgets } = this.props
    const widget = widgets[widgets.map((widget) => { return widget.id.toString()}).indexOf(this.props.params.widget_id)]
    return(
      <div className="flex-auto bg-silver gray">
        <FormWidgetMenu {...this.props} widget={widget} />
      </div>
    )
  }

  renderLoading(){
    return(
      <Loading />
    )
  }

  render() {
    return(this.props.widgets.length > 0 ? this.renderFields() : this.renderLoading())
  }
}
