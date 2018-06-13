import React from 'react'
import { Footer, Page as Content } from 'bonde-styleguide'
import Header from './Header'

const Page =  ({
  children,
  renderTitle,
  renderLeftDropdown,
  renderActionButtons,
  renderTabs
}) => (
  <div>
    <Header
      renderTitle={renderTitle}
      renderLeftDropdown={renderLeftDropdown}
      renderActionButtons={renderActionButtons}
      renderTabs={renderTabs}
    />

    <Content>{children}</Content>
    <Footer />
  </div>
)

Page.propTypes = {
  ...Header.propTypes
}

export default Page
