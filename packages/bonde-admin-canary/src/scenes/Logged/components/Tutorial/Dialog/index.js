import React from 'react'
import PropTypes from 'prop-types'
import Context from '../Context'
import DialogTooltip from './DialogTooltip'

export class RegisterDialog extends React.Component {
  componentDidMount () {
    const { name, step, context } = this.props
    context.registerStep(name, step)
  }

  render () {
    const { context, ...props } = this.props

    return context.currentStep === props.step ? (
      <DialogTooltip
        total={context.total}
        currentStep={context.currentStep}
        {...props}
      />
    ) : props.children
  }
}

const Dialog = (props) => (
  <Context.Consumer>
    {context => <RegisterDialog context={context} {...props} />}
  </Context.Consumer>
)

Dialog.propTypes = {
  name: PropTypes.string.isRequired,
  step: PropTypes.number.isRequired
}

export default Dialog
