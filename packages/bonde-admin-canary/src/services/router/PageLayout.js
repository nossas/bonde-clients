import React from 'react'
import { Route } from 'react-router'
import { Page } from 'components/PageLogged'


const PageLayout = ({ component: Component, pageProps, ...rest }) => {
  return (
    <Route {...rest} render={(matchProps) => {
      return (
        <Page {...pageProps}>
          <Component {...matchProps} />
        </Page>
      )
    }} />
  )
}

export default PageLayout