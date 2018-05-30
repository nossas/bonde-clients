import React from 'react'
import styled from 'styled-components'

const Fixed = styled.div`{
  position: 'fixed';
  top: '0';
  width: '100%';
  zIndex: '2';
}`

const Header = styled.div`{
  position: relative;
  width: inherit;
  min-height: 80px;
  background: #000;
  padding: 22px 155px;
}`

/* @component */
export default ({ id, ...props }) => (
  <Fixed id={id}>
    <Header {...props} />
  </Fixed>
)
