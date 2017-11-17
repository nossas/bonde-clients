import React from 'react'
import PropTypes from 'prop-types'

export const createFormProvider = (Component) => {
  class Form extends React.Component {
    constructor (props, context) {
      super(props, context)
      this.state = { submitted: false }
    }

    getChildContext () {
      return {
        form: {
          fields: this.props.fields
        }
      }
    }

    componentWillReceiveProps (nextProps) {
      const submitIsDone = (
        this.props.submitting &&
        !nextProps.submitting &&
        !nextProps.submitFailed
      )
      if (submitIsDone) {
        this.setState({ submitted: true })
      }
    }

    render () {
      const { children, successMessage, handleSubmit, submit } = this.props
      return (
        <Component
          successMessage={successMessage}
          submitted={this.state.submitted}
          onSubmit={handleSubmit(submit)}
        >
          {children}
        </Component>
      )
    }
  }

  Form.displayName = `createForm(${Component.displayName || Component.name || Component})`
  Form.childContextTypes = {
    form: PropTypes.object.isRequired
  }

  return Form
}

export const FormProvider = createFormProvider('form')
