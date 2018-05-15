import React from 'react'
import styled from 'styled-components'
import BGImage from './assets/bg@2x.png'
import Flexbox from '../Flexbox2/Flexbox2'
import { Title } from '../../content'


const Content = styled.div`
  position: fixed;
  width: 50%;
  height: 100%;
  
  ${props => props.left && `left: 0;`}
  ${props => props.right && `right: 0;`}

  ${props => props.bgImage && `
    background: url('${props.bgImage}') no-repeat;
    background-position: center center;
    background-size: cover; 
  `}
  ${props => props.bgColor && `
    background-color: ${props.bgColor}; 
  `}
`

const Container = styled.div`
  display: flex;
`

export default ({ children }) => (
  <Container>
    <Content left bgImage={BGImage}>
      <Flexbox vertical middle padding='0 160px'>
        <Title.H2 color='#fff'>Quer mobilizar pessoas por uma causa?</Title.H2>
        <Title.H2 color='#fff'>
          Cola aí, pode entrar. 
          O BONDE te leva lá.
        </Title.H2>
      </Flexbox>
    </Content>
    <Content right bgColor='#fff'>
      <Flexbox vertical middle padding='0 160px'>
        {children}
      </Flexbox>
    </Content>
  </Container>
)
