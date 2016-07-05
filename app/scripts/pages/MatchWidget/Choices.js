import React, { PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import * as WidgetActions from './../../actions/WidgetActions'

import MatchPage from './MatchPage'
import AddChoiceForm from './AddChoiceForm'


class Choices extends React.Component {
  
  constructor(props, context) {
    super(props, context)
    
    const widget = this.widget()
    this.state = {
      loading: false,
      choicesA: widget.settings.choicesA ? widget.settings.choicesA.split(',') : [],
      choices1: widget.settings.choices1 ? widget.settings.choices1.split(',') : [],
    }
  }

  widget(props = this.props) {
    const { widgets, params } = props
    const widgetsStringId = widgets.data.map(widget => widget.id.toString())
    const widgetIndex = widgetsStringId.indexOf(params.widget_id)
    return widgets.data[widgetIndex]
  }

  handleSubmit(e) {
    if (e) e.preventDefault()

    const widget = this.widget()
    const { dispatch, mobilization, auth } = this.props
    if (this.state.choicesA.length > 0 && this.state.choices1.length > 0) {
      const bindedWidgetActions = bindActionCreators(WidgetActions, dispatch)
      bindedWidgetActions.editWidget({
        mobilization_id: mobilization.id,
        widget_id: widget.id,
        credentials: auth.credentials,
        widget: { settings: {
          choicesA: this.state.choicesA.toString(),
          choices1: this.state.choices1.toString()
        }}
      })
    }
  }

  render() {
    const { mobilization, location } = this.props
    const widget = this.widget()

    return(
      <MatchPage mobilization={mobilization} location={location} widget={widget}>
        <div className="p3 flex-auto overflow-scroll">
          <form onSubmit={::this.handleSubmit}>
            <AddChoiceForm titleForm="Bloco 1"
                           choices={this.state.choices1}
                           updateChoices={(choices) => {this.setState({choices1: choices})}}
                           {...this.props} />
            <AddChoiceForm titleForm="Bloco A"
                           choices={this.state.choicesA}
                           updateChoices={(choices) => {this.setState({choicesA: choices})}}
                           {...this.props} />
            <button type="submit">Combinar</button>
          </form>
        </div>
      </MatchPage>
    )
  }
}

Choices.propTypes = {
  params: PropTypes.object.isRequired,
  mobilization: PropTypes.object.isRequired,
  widgets: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired
}

Choices.contextTypes = {
  router: PropTypes.object.isRequired
}

export default Choices
