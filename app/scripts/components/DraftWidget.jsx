import React from 'react'
import { Loading } from './'
import { bindActionCreators } from 'redux'
import * as WidgetActions from './../actions/WidgetActions'

export default class DraftWidget extends React.Component {
  constructor(props, context) {
    super(props, context)
    this.state = {
      loading: false
    }
  }

  handleContentClick(event) {
    event.preventDefault()
    this.updateKind('content')
  }

  handleFormClick(event) {
    event.preventDefault()
    this.updateKind('form')
  }

  updateKind(kind) {
    const { dispatch } = this.props
    const bindedWidgetActions = bindActionCreators(WidgetActions, dispatch)
    this.setState({loading: true})
    bindedWidgetActions.editWidget({
      mobilization_id: this.props.mobilization.id,
      widget_id: this.props.widget.id,
      widget: { kind }
    })
  }

  renderLoading() {
    if (this.state.loading) {
      return (
        <Loading />
      )
    }
  }

  renderDraft() {
    if(this.props.editable){
      return (
        <div className="widget border center p2" style={{borderStyle: 'dashed'}}>
          <h4>Escolha uma das opções abaixo</h4>
          <button className="caps button bg-darken-4 mt1 p2 full-width" onClick={::this.handleContentClick}>
            Texto
          </button>
          <button className="caps button bg-darken-4 mt1 p2 full-width" onClick={::this.handleFormClick}>
            Formulário
          </button>
        </div>
      )
    }
  }

  render() {
    return(
      <div>
        {this.renderDraft()}
        {this.renderLoading()}
      </div>
    )
  }
}
