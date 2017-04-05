import React, { Component, PropTypes } from 'react'
import StepButton from './step-button'
import StepForm from './step-form'

if (require('exenv').canUseDOM) require('./step-content.scss')

const cloneStepChildren = (child, props, whitelist) => {
  return whitelist.includes(child.type)
    ? React.cloneElement(child, props)
    : child
}

class StepContent extends Component {
  renderIcon () {
    const { step, position } = this.props
    if (position < step) {
      return (
        <span className='ic-step bg-pagenta'>
          <i className='fa fa-check' />
        </span>
      )
    }
    return (
      <span className='ic-step bg-pagenta'>
        {position}
      </span>
    )
  }

  render () {
    const {
      children,
      title,
      onNextStep,
      propsPropagationDefaultWhitelist,
      propsPropagationWhitelist
    } = this.props
    const cloneProps = { onNextStep, onFinishSubmit: onNextStep }
    const componentsWhitelist = [...propsPropagationDefaultWhitelist, ...propsPropagationWhitelist]

    return (
      <div className='components--step-content bg-white'>
        {!title ? null : (
          <div className='header'>
            <h3>{this.renderIcon()}{title}</h3>
          </div>
        )}
        <div className='content'>
          {children && children.length
            ? children.map(child => cloneStepChildren(child, cloneProps, componentsWhitelist))
            : cloneStepChildren(children, cloneProps, componentsWhitelist)
          }
        </div>
      </div>
    )
  }
}

StepContent.propTypes = {
  title: PropTypes.string,
  position: PropTypes.number,
  step: PropTypes.number,
  onNextStep: PropTypes.func,
  propsPropagationDefaultWhitelist: PropTypes.array.isRequired,
  propsPropagationWhitelist: PropTypes.array
}

StepContent.defaultProps = {
  propsPropagationDefaultWhitelist: [StepButton, StepForm],
  propsPropagationWhitelist: []
}

export default StepContent
