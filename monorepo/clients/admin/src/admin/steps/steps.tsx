import PropTypes from 'prop-types'
import React from 'react'

const INITIAL_STEP_PROGRESS = 1

class Steps extends React.Component {
  constructor(properties) {
    super(properties)
    this.state = { current: INITIAL_STEP_PROGRESS }
  }

  refreshStepsProgress(properties) {
    const { progressValidations: validations } = properties
    //
    // Check if the childrens validation pass.
    // If it pass, jump to the next step.
    // If not, define it as current.
    //
    validations && validations.length && validations.some((validate, index) => {
      this.setState({ current: ++index })
      return !validate()
    })
  }

  componentWillReceiveProps(nextProperties) {
    this.refreshStepsProgress(nextProperties)
  }

  UNSAFE_componentWillMount() {
    this.refreshStepsProgress(this.props)
  }

  render() {
    const { children, className, renderRule } = this.props

    const steps = children && children.length === 1 ? [children] : children

    return (
      <div className={`steps ${className}`}>
        {steps && steps.map((stepComponent, index) => {
          const position = index + 1
          let element
          if (renderRule(position, this.state.current)) {
            element = React.cloneElement(stepComponent, {
              key: `step-${position}`,
              step: position,
              isValid: position < this.state.current
            })
          }
          return element
        })}
      </div>
    )
  }
}

Steps.propTypes = {
  progressValidations: PropTypes.array,
  renderRule: PropTypes.func
}

export default Steps
