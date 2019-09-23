import React from 'react'
import { Page as Content } from 'bonde-styleguide'
import Header from './Header'
import Footer from './Footer'

const Page = ({
  children,
  title,
  actions,
  tabs,
  dropdown,
  wrapperHeaderComponent: WrapperHeader,
  ...pageProps
}) => {
  // calculate height to resize content and fix Footer component on bottom page
  const height = (window.innerHeight ||
    document.documentElement.clientHeight ||
    document.body.clientHeight) - 195

  const headerNode = (
    <Header
      title={title}
      actions={actions}
      tabs={tabs}
      dropdown={dropdown}
    />
  )

  return (
    <div>
      {WrapperHeader ? (
        <WrapperHeader>
          {headerNode}
        </WrapperHeader>
      ) : headerNode}

      <Content {...pageProps} height={height}>{children}</Content>
      <Footer />
    </div>
  )
}

Page.propTypes = {
  ...Header.propTypes
}

export default Page
