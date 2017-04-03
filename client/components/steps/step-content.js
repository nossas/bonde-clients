import React, { Component, PropTypes } from 'react'
import StepButton from './step-button'
import StepForm from './step-form'


const cloneStepChildren = (child, props) => {
  if (child.type === StepButton || child.type === StepForm) {
    return React.cloneElement(child, props)
  }
  return child
}


class StepContent extends Component {

  renderIcon () {
    const { isDone, position } = this.props
    if (isDone) return <i className='fa fa-check' />
    else return <span className='circle'>{position}</span>
  }

  render () {
    const { children, position, title, onNextStep, isDone } = this.props

    return (
      <div className='step bg-white'>
        {title ? <h3>{this.renderIcon()}{title}</h3> : null}
        {children && children.length ?
          children.map(child => cloneStepChildren(child, { onNextStep })) :
          cloneStepChildren(children, { onNextStep })}
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
