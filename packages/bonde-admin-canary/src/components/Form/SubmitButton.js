import React from 'react'
import { Button } from 'bonde-styleguide'
import { isValid, isPristine } from 'redux-form'
import { connect } from 'services/redux'

const mapStateToProps = (state, { formName }) => ({
  valid: isValid(formName)(state),
  pristine: isPristine(formName)(state)
})

export default connect(mapStateToProps)(
  ({ children, valid, pristine }) => (
    <Button type='submit' disabled={pristine || !valid}>
      {children}
    </Button>
  )
)
