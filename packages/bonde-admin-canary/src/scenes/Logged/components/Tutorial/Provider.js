// Provider é responsável por unir componentes Dialog em um tutorial
import React from 'react'
import PropTypes from 'prop-types'
import Context, { defaultContext } from './Context'

class Provider extends React.Component {

  state = defaultContext

  registerStep (name, step) {
    if (!Object.keys(this.state.steps).includes(name)) {
      this.setState({
        steps: {
          ...this.state.steps,
          [name]: step
        }
      })
    }
  }

  render () {
    const context = {
      registerStep: this.registerStep.bind(this),
      currentStep: this.state.currentStep,
      total: Object.keys(this.state.steps).length
    }

    return (
      <Context.Provider value={context}>
        {this.props.children}
      </Context.Provider>
    )
  }
}

Provider.propTypes = {
  name: PropTypes.string.isRequired
}

export default Provider
