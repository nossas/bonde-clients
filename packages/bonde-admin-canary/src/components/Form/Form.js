import React from 'react'
import PropTypes from 'prop-types'
import { reduxForm } from 'redux-form'
import { InputHint, Flexbox2 as Flexbox } from 'bonde-styleguide'

const Form = ({ children, error, handleSubmit }) => {
  return (
    <form style={{ width: '100%' }} onSubmit={handleSubmit}>
      <Flexbox horizontal end>
        {error && <InputHint invalid>{error}</InputHint>}
      </Flexbox>
      {children}
    </form>
  )
}

Form.propTypes = {
  children: PropTypes.node,
  error: PropTypes.any,
  handleSubmit: PropTypes.func
}

const FormRedux = ({ name, children, ...formProps }) => {
  const ReduxFormComponent = reduxForm({ form: name })(Form)
  const elements = React.Children.toArray(children)

  return (
    <ReduxFormComponent {...formProps}>
      {elements.map(child => React.cloneElement(child, { formName: name }))}
    </ReduxFormComponent>
  )
}

FormRedux.propTypes = {
  /* name form used to controller redux */
  name: PropTypes.string.isRequired,
  /* all children received default props { formName: props.name } */
  children: PropTypes.any
}

export default FormRedux
