import PropTypes from 'prop-types'


function Step({ children, stepComponent: StepComponent, ...properties }) {
  return <StepComponent {...properties}>
    {children}
  </StepComponent>
}

Step.propTypes = {
  step: PropTypes.number,
  isValid: PropTypes.bool,
  stepComponent: PropTypes.any.isRequired
}

export default Step
