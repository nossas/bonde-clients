import React from 'react'

const overlayStyle = {
  backgroundColor: 'rgba(0,0,0,0.5)',
  position: 'absolute',
  top: 0,
  right: 0,
  left: 0,
  bottom: 0,
  cursor: 'pointer'
}

const Overlay = ({ children, widget }) => (
  <div style={overlayStyle} onClick={() => console.log('clicked widget')}>
    {children}
  </div>
)

export default Overlay
