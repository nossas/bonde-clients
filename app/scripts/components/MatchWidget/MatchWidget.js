import React, { Component, PropTypes } from 'react'

import * as Paths from './../../Paths'
import { OverlayWidget } from '../OverlayWidget'
import Choices from './Choices'

class MatchWidget extends Component {

  constructor(props, context) {
    super(props, context)
    this.state = {
      numberSelected: undefined,
      letterSelected: undefined
    }
  }

  redirectTo(e) {
    const { mobilization, widget, editable } = this.props
    if (e) e.preventDefault()
    if (editable) {
      this.context.router.transitionTo(
        Paths.matchChoicesMobilizationWidget(mobilization.id, widget.id)
      )
    }
  }

  render() {
    const { selectedChoice1, selectedChoiceA } = this.state
    const { editable, loading } = this.props
    const { widget: { settings: {
        title_text,
        labelChoices1,
        labelChoicesA,
        choices1,
        choicesA
      } }
    } = this.props
    const optionsChoices1 = choices1 ? choices1.split(',') : []
    const optionsChoicesA = choicesA ? choicesA.split(',') : []

    ////
    // @todo
    // - texto do heading <h2> deve ser configurável;
    // - prop `title` do componente <Choices> deve ser configurável.
    ////
    return (
      <OverlayWidget editable={editable} onClick={::this.redirectTo}>
        <div className="match-widget p3 bg-darken-3 relative">
          <h2 className="mt0 mb3 center">{title_text}</h2>
          <Choices
            title={labelChoices1}
            selected={this.state.numberSelected}
            options={optionsChoices1}
            disabled={false}
            onChange={(option) => {
              this.setState({ selectedChoice1: option.target.value })
            }}
            classNames={['mb2']}
          />
          <Choices
            { ...this.props }
            title={labelChoicesA}
            selected={this.state.letterSelected}
            options={optionsChoicesA}
            disabled={!(selectedChoice1)}
            onChange={(option) => {
              this.setState({ selectedChoiceA: option.target.value })
            }}
            classNames={['mb2']}
          />
          <button
            className="match caps button bg-darken-4 p2 full-width mt1 mb2"
            disabled={loading || (!this.state.numberSelected && !this.state.letterSelected)}
            disabled={!(selectedChoice1 && selectedChoiceA)}>
            {loading ? 'Combinando...' : 'Combinar' }
          </button>
        </div>
      </OverlayWidget>
    )
  }
}

MatchWidget.propTypes = {
  mobilization: PropTypes.object.isRequired,
  widget: PropTypes.object.isRequired
}

MatchWidget.contextTypes = {
  router: PropTypes.object.isRequired,
}

export default MatchWidget
