import React from 'react'
import { Button } from './'

const floatSubmitStyle = {
  color: 'rgb(54, 76, 85)',
  float: 'none',
  fontFamily: '"Source Sans Pro", "Proxima Nova", sans-serif',
  lineHeight: '24px',
  position: 'fixed',
  right: '64px',
  textAlign: 'right',
  top: '32px'
}

export default ({ children, onSubmit, submitting }) => (
  <form onSubmit={onSubmit}>
    {children}
    <div style={floatSubmitStyle}>
      <Button disabled={submitting} type='submit'>Salvar</Button>
    </div>
  </form>
)
