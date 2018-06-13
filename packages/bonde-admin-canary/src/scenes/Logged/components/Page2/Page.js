import React from 'react'
import { Footer, Page as Content } from 'bonde-styleguide'
import Header from './Header'

export default ({ children }) => (
  <div>
    <Header />
    <Content>
      {children}
    </Content>
    <Footer />
  </div>
)
