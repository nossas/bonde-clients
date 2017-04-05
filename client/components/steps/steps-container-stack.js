import React, { Component, PropTypes } from 'react'

class StepsContainerStack extends Component {
  constructor (props) {
    super(props)
    this.state = { step: 1 }
  }

  nextStep (index) {
    if (this.state.step === index) {
      this.setState({ step: this.state.step + 1 })
    }
  }

  hasPointer () {
    return this.props.ComponentPointerContainer &&
      this.props.ComponentPointerChildren &&
      this.props.pointerChildrenProps
  }

  render () {
    const {
      ComponentPointerContainer,
      ComponentPointerChildren,
      pointerChildrenProps,
      children
    } = this.props

    return (
      <div className='steps-stack'>
        {!(this.hasPointer()) ? null : (
          <ComponentPointerContainer>
            {!(children && children.length) ? null : children.map((child, index) => (
              <ComponentPointerChildren
                {...pointerChildrenProps({
                  ...this.state,
                  ...this.props,
                  index: index + 1
                })}
              />
            ))}
          </ComponentPointerContainer>
        )}

        {/* Render StepContent with position */}
        {children && children.length ? children.map((child, index) => {
          const position = index + 1
          if (position <= this.state.step) {
            return React.cloneElement(child, {
              position,
              step: this.state.step,
              onNextStep: () => this.nextStep(position)
            })
          }
        }) : children ? React.cloneElement(children, { position: 1 }) : null}
      </div>
    )
  }
}

StepsContainerStack.propTypes = {
  ComponentPointerContainer: PropTypes.node,
  ComponentPointerChildren: PropTypes.node,
  pointerChildrenProps: PropTypes.func
}

export default StepsContainerStack
