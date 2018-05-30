import React from 'react'
import { Link } from 'react-router-dom'
import { Button } from 'bonde-styleguide'

const ActionButton = ({ label, to }) => (
  <Link to={to}>
    <Button label={label} margin={{ left: 17 }}>
      {label}
    </Button>
  </Link>
)

export default ActionButton
