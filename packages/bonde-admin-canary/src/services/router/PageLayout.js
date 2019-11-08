import React from 'react'
import PropTypes from 'prop-types'
import { Route } from 'react-router'
import { Page } from 'components/PageLogged'

const PageLayout = ({ component: Component, pageProps, componentProps, ...rest }) => {
  return (
    <Route {...rest} render={(matchProps) => {
      return (
        <Page {...pageProps}>
          <Component {...matchProps} {...componentProps} />
        </Page>
      )
    }} />
  )
}

PageLayout.propTypes = {
  component: PropTypes.any,
  // used to extend props of Page
  pageProps: PropTypes.object,
  // used to extend props of Component
  componentProps: PropTypes.object
}

PageLayout.defaultProps = {
  pageProps: {},
  componentProps: {}
}

export default PageLayout
