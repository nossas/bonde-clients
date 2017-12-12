import React from 'react'
import { connect } from 'react-redux'
import { renderRoutes } from 'react-router-config'
import { Background } from '~client/components/layout'

const mapStateToProps = () => ({
  image: require('exenv').canUseDOM ? require('~client/images/bg-login.png') : '',
  contentSize: 12
})

const BackgroundContainer = ({ children, route, ...props }) => (
  <Background {...props}>
    {children}
    {renderRoutes(route.routes)}
  </Background>
)

export default connect(mapStateToProps)(BackgroundContainer)
