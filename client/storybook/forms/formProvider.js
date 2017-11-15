import React from 'react'
import PropTypes from 'prop-types'

// FormProvider
export class FormProvider extends React.Component {

  getChildContext() {
    return {
      form: {
        fields: this.props.fields
      }
    }
  }

  render() {
    const { children, handleSubmit, submit } = this.props
    return (
      <form onSubmit={handleSubmit(submit)}>
        {children}
        <button type='submit'>Submit!</button>
      </form>
    )
  }
}

FormProvider.childContextTypes = {
  form: PropTypes.object.isRequired
}

export default FormProvider
