import React from 'react'
import PropTypes from 'prop-types'
import { Tutorial } from 'components'

const Dialog = ({ children, step, t, ...props }) => (
  <Tutorial.Dialog
    step={step}
    name={`tutorial-step-${step}`}
    title={t(`tutorial.steps.${step}.title`)}
    description={t(`tutorial.steps.${step}.description`)}
    {...props}
  >
    {children}
  </Tutorial.Dialog>
)

Dialog.propTypes = {
  children: PropTypes.node,
  step: PropTypes.number,
  t: PropTypes.func
}

export default Dialog