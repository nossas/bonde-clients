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

const ActionButtonsContainer = styled.div`
  & > * {
    margin-left: 16px;
  }
`

const Header = styled(({
  children,
  className,
  pageTitle,
  actionButtons,
  navbar: Navbar,
  tabNavigation: Tabs
}) => (
  <div className={className}>
    {Navbar && <Navbar />}
    <Container>
      {pageTitle && <Title.H3 color='#fff'>{pageTitle}</Title.H3>}
      {actionButtons && (
        <ActionButtonsContainer>
          {actionButtons}
        </ActionButtonsContainer>
      )}
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
  pageTitle: string,
  /** The navbar component. */
  navbar: oneOfType([node, func]),
  /** The action button component. */
  actionButtons: arrayOf(oneOfType([node, func])),
  /** The tab navition component. */
  tabNavigation: oneOfType([node, func])
}

/* @component */
export default Header
