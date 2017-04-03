import React, { Component, PropTypes } from 'react'
import StepButton from './step-button'
import StepForm from './step-form'

if (require('exenv').canUseDOM) require('./step-content.scss')


const cloneStepChildren = (child, props) => {
  if (child.type === StepButton || child.type === StepForm) {
    return React.cloneElement(child, props)
  }
  return child
}


class StepContent extends Component {

  renderIcon () {
    const { isDone, position } = this.props
    if (isDone) return <span className='ic-step bg-pagenta'><i className='fa fa-check' /></span>
    else return <span className='ic-step bg-pagenta'>{position}</span>
  }

  render () {
    const { children, position, title, onNextStep, isDone } = this.props

    return (
      <div className='step bg-white'>
        <div className='header'>
        {title ? <h3>{this.renderIcon()}{title}</h3> : null}
        </div>
        <div className='content'>
          {children && children.length ?
            children.map(child => cloneStepChildren(child, { onNextStep })) :
            cloneStepChildren(children, { onNextStep })}
        </div>
      </div>
    )
  }
}

StepContent.propTypes = {
  title: PropTypes.string,
  position: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onNextStep: PropTypes.func
}

export default StepContent
