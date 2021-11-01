import PropTypes from 'prop-types'
import { Button } from "../../ux/components"


function StepButton({ children, onClick, onNextStep, ...properties }) {
  return <Button
    onClick={(e) => {
      onClick && onClick(e)
      onNextStep && onNextStep()
    }}
    {...properties}
  >
    {children}
  </Button>
}

StepButton.propTypes = {
  onClick: PropTypes.func,
  onNextStep: PropTypes.func
}

export default StepButton
