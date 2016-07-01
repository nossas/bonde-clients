import React from 'react'
import { bindActionCreators } from 'redux'
import * as WidgetActions from './../actions/WidgetActions'
import { TabMenu, TabMenuItem, FormWidget, Loading, CloseButton } from './../components'
import * as Paths from './../Paths'

export default class MatchWidgetChoices extends React.Component {
  constructor(props, context) {
    super(props, context)
    this.state = {
      loading: false
    }
  }

  widget(props = this.props) {
    const { widgets } = props
    return widgets.data[widgets.data.map((widget) => { return widget.id.toString()}).indexOf(this.props.params.widget_id)]
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
