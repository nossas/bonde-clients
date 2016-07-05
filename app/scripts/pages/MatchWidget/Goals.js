import React, { PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import * as WidgetActions from './../../actions/WidgetActions'

import MatchPage from './MatchPage'
import ChoiceCombined from './ChoiceCombined'

class Choices extends React.Component {

  constructor(props, context) {
    super(props, context)
  }

  widget(props = this.props) {
    const { widgets, params } = props
    const widgetsStringId = widgets.data.map(widget => widget.id.toString())
    const widgetIndex = widgetsStringId.indexOf(params.widget_id)
    return widgets.data[widgetIndex]
  }

  render() {
    const { mobilization, location } = this.props
    const widget = this.widget()
    const { settings: { choices1, choicesA } } = widget

    return(
      <MatchPage mobilization={mobilization} location={location} widget={widget}>
        <div className="p3 flex-auto overflow-scroll">
          {choices1 && choices1.map((choice, index) => {
            return <ChoiceCombined a={choice} b={choicesA[index]} />
          })}
        </div>
      </MatchPage>
    )
  }
}

// Choices.propTypes = {
//   params: PropTypes.object.isRequired,
//   mobilization: PropTypes.object.isRequired,
//   widgets: PropTypes.object.isRequired,
//   location: PropTypes.object.isRequired
// }

// Choices.contextTypes = {
//   router: PropTypes.object.isRequired
// }

export default Choices
