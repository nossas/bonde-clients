import React from 'react'
import { Button } from 'bonde-styleguide'
import { connect } from 'react-redux'
import { isValid, isPristine } from 'redux-form'

const mapStateToProps = (state, { formId }) => {
  return {
    valid: isValid(formId)(state),
    pristine: isPristine(formId)(state)
  }
}

const SubmitButton = connect(mapStateToProps)(
  ({ children, valid, pristine }) => {
    return (
      <Button type='submit' disabled={pristine || !valid}>
        {children}
      </Button>
    )
  }
)

export default SubmitButton
