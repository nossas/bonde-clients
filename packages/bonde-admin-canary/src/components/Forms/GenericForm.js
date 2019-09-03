import React from 'react'
import PropTypes from 'prop-types'
import { Flexbox2 as Flexbox, InputHint } from 'bonde-styleguide'
import resetForm from './resetForm'

/**
  * GenericForm
  *
  * Render a form and a form error component
  */
class GenericForm extends React.Component {
  componentWillUnmount () {
    const { formId, cleanForm } = this.props
    if (cleanForm) resetForm(formId)
  }

  render () {
    const { children, error, handleSubmit } = this.props

    return (
      <form style={{ width: '100%' }} onSubmit={handleSubmit}>
        <Flexbox horizontal end>
          {error && <InputHint invalid>{error}</InputHint>}
        </Flexbox>
        {children}
      </form>
    )
  }
}

const { bool, node, any, func, number } = PropTypes

GenericForm.propTypes = {
  formId: number,
  children: node,
  error: any,
  handleSubmit: func,
  cleanForm: bool.isRequired
}

GenericForm.defaultProps = {
  cleanForm: false
}

export default GenericForm
