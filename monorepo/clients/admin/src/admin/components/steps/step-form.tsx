import PropTypes from 'prop-types'
import { FormRedux } from "../forms"



function StepForm({ children, buttonText, onNextStep, ...formProperties }) {
  return (
    <FormRedux nosubmit {...formProperties} onFinishSubmit={onNextStep}>
      {children}
    </FormRedux>
  )
}

StepForm.propTypes = {
  onNextStep: PropTypes.func
}

export default StepForm
