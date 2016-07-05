import React, { Component } from 'react'
import Choices from './Choices'


class MatchWidget extends Component {

  constructor(props, context) {
    super(props,context)
    this.state = {
      numberSelected: undefined,
      letterSelected: undefined
    }
  }

  render() {
    const { numberChoices, letterChoices } = this.props
    return (
      <div className="match-widget p3 bg-darken-3 relative">
        <Choices selected={this.state.numberSelected} options={numberChoices} onSelected={(selected) => {
          this.setState({numberSelected: selected})
        }}/>
        <Choices selected={this.state.letterSelected} options={letterChoices} onSelected={(selected) => {
          this.setState({letterSelected: selected})
        }} />
        <button className="match" disabled={!this.state.numberSelected && !this.state.letterSelected}>Combinar</button>
      </div>
    )
  }
}

MatchWidget.defaultProps = {
  numberChoices: [],
  letterChoices: []
}

export default MatchWidget
