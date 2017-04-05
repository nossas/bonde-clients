import React, { Component, PropTypes } from 'react'

class StepsContainerStack extends Component {
  constructor (props) {
    super(props)
    this.state = { step: 1 }
  }

  hasPointer () {
    return this.props.ComponentPointerContainer &&
      this.props.ComponentPointerChildren &&
      this.props.pointerChildrenProps
  }

  componentWillMount () {
    const { children } = this.props

    //
    // Check if the childrens validation pass. (children: <StepContent />.validate)
    // If it pass, jump to the next step.
    // If not, define it as current.
    //
    children && children.length && children.map((child, index) => {
      const { step } = this.state
      const { props: { validate } } = child
      const position = index + 1

      const isCurrent = step === position
      const isLast = children.length === position

      if (isCurrent && !isLast && validate()) {
        this.setState({ ...this.state, step: position + 1 })
      }
    })
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
          const { step } = this.state
          const position = index + 1
          const isCurrentStep = position === step
          const incrementStep = () => this.setState({ step: step + 1 })

          if (position <= step) {
            const { validate } = child.props
            const styleFromParent = { display: isCurrentStep ? 'block' : 'none' }
            const onNextStep = () => isCurrentStep && validate() && incrementStep()
            const propagateProps = { position, step, styleFromParent, onNextStep }

            return React.cloneElement(child, propagateProps)
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
