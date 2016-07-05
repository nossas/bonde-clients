import React, { PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import * as WidgetActions from './../../actions/WidgetActions'

import MatchPage from './MatchPage'
import ChoiceCombined from './ChoiceCombined'


class Goals extends React.Component {

  constructor(props, context) {
    super(props, context)
  }

  widget(props = this.props) {
    const { widgets, params } = props
    const widgetsStringId = widgets.data.map(widget => widget.id.toString())
    const widgetIndex = widgetsStringId.indexOf(params.widget_id)
    return widgets.data[widgetIndex]
  }

  combineChoices() {
    const { settings: { choices1, choicesA } } = this.widget()
    const choicesZ = choices1 ? choices1.split(',') : []
    const choicesY = choicesA ? choicesA.split(',') : []

    return choicesZ.map((a) => {
      return choicesY.map((b) => {
        return <ChoiceCombined a={a} b={b} />
      })
    })
  }

  render() {
    const { mobilization, location } = this.props
    const widget = this.widget()

    return(
      <MatchPage mobilization={mobilization} location={location} widget={widget}>
        <div className="p3 flex-auto overflow-scroll">
          {::this.combineChoices()}
        </div>
      </MatchPage>
    )
  }
}

Goals.propTypes = {
  params: PropTypes.object.isRequired,
  mobilization: PropTypes.object.isRequired,
  widgets: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired
}

Goals.contextTypes = {
  router: PropTypes.object.isRequired
}

export default Goals
