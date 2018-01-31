import React from 'react'
import styled from 'styled-components'

export default styled.div`{
  position: fixed;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${props => props.bg || '#fff'}
}`
