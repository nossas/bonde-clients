import React from 'react'
import { Page as Content } from 'bonde-styleguide'
import Header from './Header'
import Footer from './Footer'

const Page =  ({
  children,
  renderTitle,
  renderActionButtons,
  renderTabs,
  wrapperHeaderComponent: WrapperHeader,
  bgColor,
  ...pageProps
}) => {
  const headerNode = (
    <Header
      renderTitle={renderTitle}
      renderActionButtons={renderActionButtons}
      renderTabs={renderTabs}
    />
  )

  return (
    <div>
      {WrapperHeader ? (
        <WrapperHeader>
          {headerNode}
        </WrapperHeader>
      ) : headerNode}

      <Content {...pageProps}>{children}</Content>
      <Footer />
    </div>
  )
}

Page.propTypes = {
  ...Header.propTypes
}

export default Page
