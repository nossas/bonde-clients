import React from 'react'
import PropTypes from 'prop-types'
import { Form } from 'components/Form'
import ContentPage from './ContentPage'

const FormContentPage = ({ form: FormComponent, formProps, ...rest }) => (
  <FormComponent {...formProps}>
    <ContentPage {...rest} />
  </FormComponent>
)

FormContentPage.propTypes = {
  form: PropTypes.any.isRequired,
  formProps: PropTypes.object
}

FormContentPage.defaultProps = {
  form: Form,
  formProps: {}
}

export default FormContentPage
