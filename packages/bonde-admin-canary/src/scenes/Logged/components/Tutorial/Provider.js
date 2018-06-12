// Provider é responsável por unir componentes Dialog em um tutorial
import React from 'react'
import Context, { defaultContext } from './Context'

class Provider extends React.Component {
  state = defaultContext

  //
  // Class attribute that stores all childrens keys
  // in rendering runtime, to update Provider state with it.
  //
  registeredStepKeys = []

  registerStep (key) {
    if (!this.registeredStepKeys.includes(key)) {
      this.registeredStepKeys.push(key)
      this.setState({ steps: this.registeredStepKeys })
    }
  }

  onNext () {
    this.setState({
      currentStep: this.state.currentStep + 1
    })
  }

  render () {
    const context = {
      registerStep: this.registerStep.bind(this),
      onNext: this.onNext.bind(this),
      currentStep: this.state.currentStep,
      total: this.state.steps.length
    }

    return (
      <Context.Provider value={context}>
        {this.props.children}
      </Context.Provider>
    )
  }
}

export default Provider
