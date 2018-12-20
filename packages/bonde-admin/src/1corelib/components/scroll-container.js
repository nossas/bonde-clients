import React from 'react'

const ScrollContainer = ({ children }) => (
  <div id='scroll-container' className='flex-auto' style={{ overflowY: 'scroll' }}>
    {children}
  </div>
)

export default ScrollContainer