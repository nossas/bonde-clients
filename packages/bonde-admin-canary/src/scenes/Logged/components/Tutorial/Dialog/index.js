import React from 'react'
import PropTypes from 'prop-types'
import Context from '../Context'
import DialogTooltip from './DialogTooltip'

export class RegisterDialog extends React.Component {
  
  componentDidMount () {
    this.props.registerStep(this.props.name, this.props.step)
  }

  render () {
    const { registerStep, ...props } = this.props  // es-lint-ignore-line
    return <DialogTooltip {...props} />
  } 
}

const Dialog = (props) => (
  <Context.Consumer>
    {(context) => <RegisterDialog {...context} {...props} />}
  </Context.Consumer>
)

Dialog.propTypes = {
  name: PropTypes.string.isRequired,
  step: PropTypes.number.isRequired
}

export default Dialog
