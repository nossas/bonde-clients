import React from 'react'
import { Link } from 'react-router-dom'
import { Button } from 'bonde-styleguide'

export default ({ to, title, children }) => (
  <Link to={to} title={title}>
    <Button flat left padding='0'>
      {children}
    </Button>
  </Link>
)
