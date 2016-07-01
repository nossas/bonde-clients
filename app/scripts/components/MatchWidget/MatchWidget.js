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
    // store state
    const { editable } = this.props
    const { numberChoices, letterChoices } = this.props
    return (
      <OverlayWidget editable={editable} onClick={::this.redirectTo}>
        <div className="match-widget p3 bg-darken-3 relative">
          <Choices
            selected={this.state.numberSelected}
            options={numberChoices}
            onSelected={(selected) => {
              this.setState({numberSelected: selected})
            }}
          />
          <Choices
            selected={this.state.letterSelected}
            options={letterChoices}
            onSelected={(selected) => {
              this.setState({letterSelected: selected})
            }}
          />
          <button
            className="match"
            disabled={!this.state.numberSelected && !this.state.letterSelected}>
            Combinar
          </button>
        </div>
      </OverlayWidget>
    )
  }
}

MatchWidget.defaultProps = {
  numberChoices: [],
  letterChoices: []
}

MatchWidget.propTypes = {
  mobilization: PropTypes.object.isRequired,
  widget: PropTypes.object.isRequired
}

MatchWidget.contextTypes = {
  router: PropTypes.object.isRequired,
}

export default MatchWidget
