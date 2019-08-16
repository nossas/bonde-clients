import React from 'react'
import PropTypes from 'prop-types'
import { Form } from 'components/Form'
import ContentPage from './ContentPage'

const FormContentPage = ({ form: FormComponent, formName, formProps, ...rest }) => (
  <FormComponent name={formName} {...formProps}>
    <ContentPage {...rest} />
  </FormComponent>
)

FormContentPage.propTypes = {
  form: PropTypes.any.isRequired,
  formName: PropTypes.string,
  formProps: PropTypes.object
}

FormContentPage.defaultProps = {
  form: Form,
  formProps: {}
}

export default FormContentPage
