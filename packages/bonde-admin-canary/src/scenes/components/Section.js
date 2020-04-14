import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Header } from 'bonde-components'

import Content from 'components/Content'

const Navbar = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #000;
  padding: 0 60px;

  h3 {
    color: #fff;
    margin: 10px 0 30px;
  }
`

const Wrap = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
`

const Section = ({ children, title, navigation: Navigation }) => (
  <Wrap>
    <Navbar>
      <Header.h3>{title}</Header.h3>
      {Navigation && <Navigation />}
    </Navbar>
    <Content>
      {children}
    </Content>
  </Wrap>
)

Section.propTypes = {
  children: PropTypes.any,
  title: PropTypes.string.isRequired,
  navigation: PropTypes.any
}

export default Section
