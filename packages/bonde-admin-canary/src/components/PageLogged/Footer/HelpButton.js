import React from 'react'
import { Button } from 'bonde-styleguide'


export default ({ children }) => (
  <Button
    dark
    onClick={() => {
      window.open('http://www.trilho.bonde.org/', '_blank')
    }}
  >
    {children}
  </Button>
)
