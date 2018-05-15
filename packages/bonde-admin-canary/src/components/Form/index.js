import React from 'react'
import { reduxForm } from 'redux-form'

const Form = ({ children, handleSubmit }) => {
  
  return (
    <form style={{ width: '100%' }} onSubmit={handleSubmit}>
      {children}
    </form>
  )

}

export { Field, SubmissionError } from 'redux-form'

export default reduxForm({ form: 'authLogin' })(Form)
