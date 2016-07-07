import React, { PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as WidgetActions from './../../actions/WidgetActions'

import MatchPage from './MatchPage'
import ChoiceCombined from './ChoiceCombined'


export default class Goals extends React.Component {

  constructor(props, context) {
    super(props, context)
    this.bindWidgetActions = bindActionCreators(WidgetActions, props.dispatch)
  }

  widget(props = this.props) {
    const { widgets, params } = props
    const widgetsStringId = widgets.data.map(widget => widget.id.toString())
    const widgetIndex = widgetsStringId.indexOf(params.widget_id)
    return widgets.data[widgetIndex]
  }

  finishedUploadFile(goal) {
    const { auth } = this.props
    this.bindWidgetActions.addMatch({
      widget_id: this.widget().id,
      credentials: auth.credentials,
      match: goal
    })
  }

  findMatchList(widget, firstChoice, secondChoice) {
    return widget.match_list.filter((match) => {
      return match.first_choice == firstChoice && match.second_choice == secondChoice
    })
  }

  renderCombineChoices(widget) {

    const { settings: { choices1, choicesA } } = this.widget()
    const choicesZ = choices1 ? choices1.split(',') : []
    const choicesY = choicesA ? choicesA.split(',') : []

    return choicesZ.map((a) => {
      return choicesY.map((b, index) => {
        const isLast = index === choicesY.length-1
        const combined = this.findMatchList(widget, a, b)
        let props = {
          match: {
            firstChoice: a,
            secondChoice: b,
          },
          classes: isLast ? ['mb3'] : [],
          handleUploadFinish: this.finishedUploadFile.bind(this)
        }
        if (combined && combined.length > 0) {
          props.match.goalImage = combined[0].goal_image
        }
        return <ChoiceCombined {...props} />
      })
    })
  }

  render() {
    const { mobilization, location } = this.props
    const widget = this.widget()
    return(
      <MatchPage mobilization={mobilization} location={location} widget={widget}>
        <div className="p3 flex-auto overflow-scroll">
          <h3 className="mb3">Combinações</h3>
          {::this.renderCombineChoices(widget)}
        </div>
      </MatchPage>
    )
  }
}

Goals.propTypes = {
  params: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  mobilization: PropTypes.object,
  widgets: PropTypes.object
}

Goals.contextTypes = {
  router: PropTypes.object.isRequired
}
