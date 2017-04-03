import React, { PropTypes } from 'react'

import { FormRedux } from '~client/components/forms'

const StepForm = ({ children, buttonText, onNextStep, ...formProps }) => {

  return (
    <FormRedux nosubmit {...formProps} onFinishSubmit={onNextStep}>
      {children}
    </FormRedux>
  )
}

StepForm.propTypes = {
  onNextStep: PropTypes.func
}

export default StepForm
