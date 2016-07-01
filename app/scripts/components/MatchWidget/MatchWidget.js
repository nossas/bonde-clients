import React, { Component } from 'react'

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
    if (e) e.preventDefault()
    // TODO: Redirect URL edit MatchWidget
    console.log('TODO: Redirect URL edit MatchWidget')
  }

  render() {
    // store state
    const { editable } = this.props
    const { numberChoices, letterChoices } = this.props
    return (
      <OverlayWidget editable={editable} onClick={::this.redirectTo}>
        <div className="match-widget p3 bg-darken-3 relative">
          <Choices selected={this.state.numberSelected} options={numberChoices} onSelected={(selected) => {
            this.setState({numberSelected: selected})
          }}/>
          <Choices selected={this.state.letterSelected} options={letterChoices} onSelected={(selected) => {
            this.setState({letterSelected: selected})
          }} />
          <button className="match" disabled={!this.state.numberSelected && !this.state.letterSelected}>Combinar</button>
        </div>
      </OverlayWidget>
    )
  }
}

MatchWidget.defaultProps = {
  numberChoices: [],
  letterChoices: []
}

export default MatchWidget
