import React from 'react'
import styled from 'styled-components'

const Title = styled.p`{
  font-family: 'Nunito Sans', sans-serif;
  font-size: 13px;
  font-weight: bold;
  font-style: normal;
  font-stretch: normal;
  line-height: 1.15;
  letter-spacing: 0.5px;
  text-align: left;
  color: #4a4a4a;
  text-transform: uppercase;
  
  height: 32px;
}`

const Gadget = styled(({ className, children, title, WrapperComponent }) => (
  <div className={className}>
    {title && (<Title>{title}</Title>)}
    {WrapperComponent ? (
      <WrapperComponent>
        {children}
      </WrapperComponent>
    ) : children}
  </div>
))`{
  position: relative;
}`

Gadget.displayName = 'Gadget'

export default Gadget
