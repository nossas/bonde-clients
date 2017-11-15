import React from 'react'

const style = {
  backgroundColor: 'rgb(247, 247, 247)',
  display: 'flex',
  flexBasis: 'auto',
  flexDirection: 'column',
  flexGrow: '1',
  flexShrink: '1',
  fontFamily: '"Source Sans Pro", "Proxima Nova", sans-serif',
  lineHeight: '24px',
  minHeight: '0px',
  minWidth: '0px',
  position: 'relative',
  '-moz-box-direction': 'normal',
  '-moz-box-flex': '1',
  '-moz-box-orient': 'vertical'
}

export default ({ children }) => (
  <div style={style}>
    {children}
  </div>
)
