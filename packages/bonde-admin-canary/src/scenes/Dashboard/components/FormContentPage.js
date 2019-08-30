import React from 'react'
import PropTypes from 'prop-types'
import { Form } from 'components/Forms'
import ContentPage from './ContentPage'

const FormContentPage = ({ form: FormComponent, formId, formProps, ...rest }) => (
  <FormComponent formId={formId} {...formProps}>
    <ContentPage {...rest} />
  </FormComponent>
)

FormContentPage.propTypes = {
  form: PropTypes.any.isRequired,
  formId: PropTypes.string,
  formProps: PropTypes.object
}

FormContentPage.defaultProps = {
  form: Form,
  formProps: {}
}

export default FormContentPage
