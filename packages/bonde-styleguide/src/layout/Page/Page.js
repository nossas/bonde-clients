import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const PageContainer = styled.div`{
  position: relative;
  padding-top: ${props => props.top ? `calc(${props.top}px + 32px)` : '32px'};
  padding-left: 155px;
  padding-bottom: 172px;
  padding-right: 155px;
  background-color: ${props => props.bgColor || '#EEEEEE'};
}`

const PageContent = styled.div`{
  position: relative;
  display: flex;
}`

const Page = ({ children, menuComponent: MenuComponent, bgColor, top }) => (
  <PageContainer bgColor={bgColor} top={top}>
    {MenuComponent && <MenuComponent />}
    <PageContent>
    {children}
    </PageContent>
  </PageContainer>
)

const { oneOfType, node, func, string } = PropTypes

Page.propTypes = {
  /** The content of the page. */
  children: oneOfType([node, func]),
  /** The menu component. */
  menuComponent: oneOfType([node, func]),
  /** The background color of the page. */
  bgColor: string
}

Page.displayName = 'Page'

export default Page
