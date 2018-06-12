// Provider is responsible to union Dialog components
import React from 'react'
import PropTypes from 'prop-types'
import Context, { defaultContext } from './Context'

class Provider extends React.Component {
  state = defaultContext

  //
  // Class attribute that stores all childrens keys
  // in rendering runtime, to update Provider state with it.
  //
  registeredStepKeys = []

  componentDidMount () {
    this.onStart(this.props.initialize)
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.initialize !== this.props.initialize) {
      this.onStart(nextProps.initialize)
    }
  }

  onStart (initialize) {
    if (typeof initialize === 'function' ? initialize() : initialize) {
      this.setState({ currentStep: 1 })
    }
  }

  registerStep (key) {
    if (!this.registeredStepKeys.includes(key)) {
      this.registeredStepKeys.push(key)
      this.setState({ steps: this.registeredStepKeys })
    }
  }

  onNext () {
    const { steps, currentStep } = this.state
    this.setState({
      currentStep: steps.length === currentStep ? 1 : currentStep + 1
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

Provider.defaultProps = {
  initialize: false
}

Provider.propTypes = {
  initialize: PropTypes.oneOf([
    PropTypes.func,
    PropTypes.bool
  ])
}

export default Provider
