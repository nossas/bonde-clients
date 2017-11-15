import React from 'react'
import PropTypes from 'prop-types'

export const withForm = (Component) => {
  class Form extends React.Component {
    getChildContext () {
      return {
        form: {
          fields: this.props.fields
        }
      }
    }

    render () {
      const { children, handleSubmit, submit } = this.props
      return (
        <Component onSubmit={handleSubmit(submit)}>
          {children}
        </Component>
      )
    }
  }

  Form.displayName = `withForm(${Component.displayName || Component.name || Component})`
  Form.childContextTypes = {
    form: PropTypes.object.isRequired
  }

  return Form
}

export default withForm('form')
