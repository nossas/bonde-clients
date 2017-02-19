import React, { PropTypes } from 'react'

import { Background } from '~client/components/layout'

const BackgroundContainer = ({ children }) => (
  <Background image={process.env.BROWSER ? require('~client/images/bg-login.png') : ''}>
    {children}
  </Background>
)

BackgroundContainer.propTypes = {
  children: PropTypes.node.isRequired
}

export default BackgroundContainer
