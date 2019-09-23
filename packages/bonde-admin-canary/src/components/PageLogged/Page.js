import React from 'react'
import { Page as Content } from 'bonde-styleguide'
import Header from './Header'
import Footer from './Footer'

const styles = {
  Main: {
    display: 'flex',
    flexFlow: 'column nowrap',
    height: '100%'
  },
  Content: {
    flexGrow: 1
  }
}

const Page = ({
  children,
  title,
  actions,
  tabs,
  dropdown,
  wrapperHeaderComponent: WrapperHeader,
  ...pageProps
}) => {
  const headerNode = (
    <Header
      title={title}
      actions={actions}
      tabs={tabs}
      dropdown={dropdown}
    />
  )

  return (
    <main style={styles.Main}>
      {WrapperHeader ? (
        <WrapperHeader>
          {headerNode}
        </WrapperHeader>
      ) : headerNode}

      <Content {...pageProps} style={styles.Content}>{children}</Content>
      <Footer />
    </main>
  )
}

Page.propTypes = {
  ...Header.propTypes
}

export default Page
