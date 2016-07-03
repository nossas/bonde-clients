import React, { PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import * as WidgetActions from './../actions/WidgetActions'
import { TabMenu, TabMenuItem, FormWidget, Loading, CloseButton } from './../components'
import * as Paths from './../Paths'

class MatchWidgetChoices extends React.Component {
  constructor(props, context) {
    super(props, context)
    this.state = {
      loading: false
    }
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
    const choicesPath = Paths.matchChoicesMobilizationWidget(mobilization.id, widget.id)
    const goalsPath = Paths.matchGoalsMobilizationWidget(mobilization.id, widget.id)

    return(
      <div className="flex-auto flex flex-column bg-silver gray relative">
        <TabMenu title="Configure as combinações da sua ação">
          <TabMenuItem
            path={choicesPath}
            text='Opções de combinação'
            isActive={choicesPath === location.pathname} />
          <TabMenuItem
            path={goalsPath}
            text='Resultados das combinações'
            isActive={goalsPath === location.pathname} />
        </TabMenu>
        <CloseButton
          dirty={false}
          path={Paths.editMobilization(this.props.mobilization.id)}
        />
      </div>
    )
  }
}

MatchWidgetChoices.propTypes = {
  params: PropTypes.object.isRequired,
  mobilization: PropTypes.object.isRequired,
  widgets: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired
}

MatchWidgetChoices.contextTypes = {
  router: PropTypes.object.isRequired
}

export default MatchWidgetChoices
