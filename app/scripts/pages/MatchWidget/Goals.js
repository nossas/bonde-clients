import React, { PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as MatchActions from './../../actions/MatchActions'

import MatchPage from './MatchPage'
import ChoiceCombined from './ChoiceCombined'


/*@connect(state => ({ match: state.match }))*/
export default class Goals extends React.Component {

  constructor(props, context) {
    super(props, context)
    this.bindMatchActions = bindActionCreators(MatchActions, props.dispatch)
  }

  widget(props = this.props) {
    const { widgets, params } = props
    const widgetsStringId = widgets.data.map(widget => widget.id.toString())
    const widgetIndex = widgetsStringId.indexOf(params.widget_id)
    return widgets.data[widgetIndex]
  }

  componentDidMount() {
    const { auth } = this.props
    this.bindMatchActions.fetchMatch({
      widget_id: this.widget().id,
      credentials: auth.credentials
    })
  }

  finishedUploadFile(goal) {
    const { auth } = this.props
    this.bindMatchActions.addMatch({
      widget_id: this.widget().id,
      credentials: auth.credentials,
      match: goal
    })
  }

  renderCombineChoices() {
    const { settings: { choices1, choicesA } } = this.widget()
    const choicesZ = choices1 ? choices1.split(',') : []
    const choicesY = choicesA ? choicesA.split(',') : []

    return choicesZ.map((a) => {
      return choicesY.map((b) => {
        return <ChoiceCombined firstChoice={a} secondChoice={b} handleUploadFinish={::this.finishedUploadFile} />
      })
    })
  }

  render() {
    const { mobilization, location } = this.props
    const widget = this.widget()
    console.log(this.props)
    return(
      <MatchPage mobilization={mobilization} location={location} widget={widget}>
        <div className="p3 flex-auto overflow-scroll">
          <h3 className="mb3">Combinações</h3>
          {::this.renderCombineChoices()}
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
