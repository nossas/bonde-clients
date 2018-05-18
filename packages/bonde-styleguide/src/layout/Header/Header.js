import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import Title from '../../content/Title/Title'

const Container = styled.div`{
  display: flex;
  flex-grow: 1;
  justify-content: space-between;
  align-items: center;
}`

const ButtonsWrapper = styled.div`
  & > * {
    margin-left: 16px;
  }
`

const PageTitleComponent = ({ children }) => (
  <Title.H3 color='#fff'>
    {children}
  </Title.H3>
)

const Header = styled(({
  children,
  className,
  PageTitle,
  ActionButtons,
  navbar: Navbar,
  tabNavigation: Tabs
}) => (
  <div className={className}>
    {Navbar && <Navbar />}
    <Container>
      {PageTitle && (
        PageTitle.constructor === String ?
          <PageTitleComponent>{PageTitle}</PageTitleComponent> :
          <PageTitle Default={PageTitleComponent} />
      )}
      {ActionButtons && <ActionButtons Wrapper={ButtonsWrapper} />}
    </Container>
    {Tabs && <Tabs />}
  </div>
))`{
  position: relative;
  width: inherit;
  min-height: 80px;
  background: #000;
  padding: 22px 155px;
}`

const { oneOfType, arrayOf, node, func, string } = PropTypes

Header.propTypes = {
  /** The content of the header. */
  children: oneOfType([node, func]),
  /** The page title text. */
  PageTitle: oneOfType([node, func, string]),
  /** The navbar component. */
  navbar: oneOfType([node, func]),
  /** The action button component. */
  ActionButtons: arrayOf(oneOfType([node, func])),
  /** The tab navition component. */
  tabNavigation: oneOfType([node, func])
}

/* @component */
export default Header
