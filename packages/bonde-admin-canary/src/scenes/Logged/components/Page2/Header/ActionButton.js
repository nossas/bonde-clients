import React from 'react'
import { Link } from 'react-router-dom'
import { Button, Spacing } from 'bonde-styleguide'

const ActionButton = ({ label, to, ...props }) => (
  <Spacing margin={{ left: 17 }}>
    <Link to={to}>
      <Button label={label} {...props}>
        {label}
      </Button>
    </Link>
  </Spacing>
)

export default ActionButton
