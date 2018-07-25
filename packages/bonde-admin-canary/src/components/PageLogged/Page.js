import React from 'react'
import { Page as Content } from 'bonde-styleguide'
import Header from './Header'
import Footer from './Footer'

const Page =  ({
  children,
  renderTitle,
  renderLeftDropdown,
  renderActionButtons,
  renderTabs,
  ...pageProps
}) => (
  <div>
    <Header
      renderTitle={renderTitle}
      renderLeftDropdown={renderLeftDropdown}
      renderActionButtons={renderActionButtons}
      renderTabs={renderTabs}
    />

    <Content {...pageProps}>{children}</Content>
    <Footer />
  </div>
)

Page.propTypes = {
  ...Header.propTypes
}

export default Page
