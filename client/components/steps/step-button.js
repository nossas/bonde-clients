import React, { PropTypes } from 'react'
import { Button } from '~client/ux/components'


const StepButton = ({ children, onClick, onNextStep, ...props }) => (
  <Button
    onClick={(e) => {
      onClick && onClick(e)
      onNextStep && onNextStep()
    }}
    {...props}
  >
    {children}
  </Button>
)

StepButton.propTypes = {
  onNextStep: PropTypes.func
}

export default StepButton
