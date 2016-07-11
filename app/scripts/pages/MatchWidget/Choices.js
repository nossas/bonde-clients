import React, { PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import * as WidgetActions from './../../actions/WidgetActions'

import * as Paths from './../../Paths'
import MatchPage from './MatchPage'
import AddChoiceForm from './AddChoiceForm'


class Choices extends React.Component {

  constructor(props, context) {
    super(props, context)

    const {
      settings: {
        title_text,
        choicesA, labelChoicesA,
        choices1, labelChoices1,
      }
    } = this.widget()

    this.state = {
      loading: false,
      title_text,
      choicesA: choicesA ? choicesA.split(',') : [],
      choices1: choices1 ? choices1.split(',') : [],
      labelChoicesA: labelChoicesA ? labelChoicesA : '',
      labelChoices1: labelChoices1 ? labelChoices1 : '',
      choicesChanged: false
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
    const {
      title_text,
      labelChoices1,
      labelChoicesA,
      choicesA,
      choices1
    } = this.state

    const titleTextValid = title_text.length
    const labelValid = labelChoices1.length && labelChoicesA.length
    const choicesValid = choicesA.length && choices1.length

    if (titleTextValid && labelValid && choicesValid) {
      const bindedWidgetActions = bindActionCreators(WidgetActions, dispatch)
      bindedWidgetActions.editWidget({
        mobilization_id: mobilization.id,
        widget_id: widget.id,
        credentials: auth.credentials,
        widget: { settings: {
          title_text,
          labelChoicesA,
          labelChoices1,
          choicesA: choicesA.toString(),
          choices1: choices1.toString()
        }}
      })
      this.setState({ choicesChanged: false })
      this.context.router.transitionTo(
        Paths.matchGoalsMobilizationWidget(mobilization.id, widget.id)
      )
    }
  }

  handleChangeLabelChoices1(label) {
    this.setState({ labelChoices1: label, choicesChanged: true })
  }

  handleUpdateChoices1(choices) {
    this.setState({ choices1: choices, choicesChanged: true })
  }

  handleChangeLabelChoicesA(label) {
    this.setState({ labelChoicesA: label, choicesChanged: true })
  }

  handleUpdateChoicesA(choices) {
    this.setState({ choicesA: choices, choicesChanged: true})
  }

  handleTitleTextChange(e) {
    this.setState({ title_text: e.target.value, choicesChanged: true })
  }

  render() {
    const widget = this.widget()
    const { mobilization, location } = this.props
    const {
      title_text,
      choicesChanged,
      choices1,
      choicesA,
      labelChoices1,
      labelChoicesA
    } = this.state

    return(
      <MatchPage mobilization={mobilization} location={location} widget={widget}>
        <div className="p3 flex-auto overflow-scroll">
          <form onSubmit={::this.handleSubmit}>
            <div className="sm-col sm-col-12">
              <label for="title_text">Título do bloco de combinações</label>
              <input
                id="title_text"
                type="text"
                className="field-light block h3 full-width mt1 mb3"
                placeholder="Ex.: Combine assuntos e compartilhe memes."
                style={{height: '48px'}}
                value={title_text}
                onChange={::this.handleTitleTextChange} />
            </div>

            <div className="clearfix mb3">
              <AddChoiceForm { ...this.props }
                title='Lado A'
                choices={ choices1 }
                label={ labelChoices1 }
                onChangeLabel={ ::this.handleChangeLabelChoices1 }
                updateChoices={ ::this.handleUpdateChoices1 } />

              <AddChoiceForm { ...this.props }
                title='Lado B'
                choices={ choicesA }
                label={ labelChoicesA }
                onChangeLabel={ ::this.handleChangeLabelChoicesA }
                updateChoices={ ::this.handleUpdateChoicesA } />
            </div>
            <button
              type="submit"
              disabled={!choicesChanged}
              className="button bg-aqua caps p2">
              Combinar e Salvar
            </button>
          </form>
        </div>
      </MatchPage>
    )
  }
}

Choices.propTypes = {
  params: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  mobilization: PropTypes.object,
  widgets: PropTypes.object
}

Choices.contextTypes = {
  router: PropTypes.object.isRequired
}

export default Choices
