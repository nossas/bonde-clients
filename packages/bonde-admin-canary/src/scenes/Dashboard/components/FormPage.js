import React from 'react'
import PropTypes from 'prop-types'

const FormPage = ({ form: FormComponent }) => (
  <FormComponent />
)

FormPage.propTypes = {
  form: PropTypes.any.isRequired
}

export default FormPage