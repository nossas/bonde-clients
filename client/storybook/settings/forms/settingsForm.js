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

const successMessageStyle = {
  color: 'rgb(61, 153, 112)',
  fontFamily: '"Source Sans Pro", "Proxima Nova", sans-serif',
  fontSize: '16px',
  lineHeight: '24px',
  marginTop: '5px',
  textAlign: 'right'
}

export default ({
  children,
  // Provider form
  onSubmit,
  submitted,
  // SettingsForm
  successMessage,
  // redux-form
  valid,
  submitting
}) => (
  <form onSubmit={onSubmit}>
    {children}
    <div style={floatSubmitStyle}>
      <Button disabled={submitting} type='submit'>Salvar</Button>
      {submitted && successMessage ? (
        <div style={successMessageStyle}>
          <span>{`${successMessage}`}</span>
          <i className='fa fa-check-circle olive ml1' />
        </div>
      ) : null}
    </div>
  </form>
)
