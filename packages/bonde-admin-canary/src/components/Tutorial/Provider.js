// Provider is responsible to union Dialog components
import React from 'react'
import PropTypes from 'prop-types'
import Context, { defaultContext } from './Context'
import Dialog from './Dialog'

class Provider extends React.Component {
  
  static Dialog = Dialog
  
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

  onClose () {
    this.setState({ currentStep: 0 })
    this.props.onClose && this.props.onClose()
  }

  render () {
    const context = {
      registerStep: this.registerStep.bind(this),
      onNext: this.onNext.bind(this),
      onClose: this.onClose.bind(this),
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
  ]),
  onClose: PropTypes.func
}

export default Provider
