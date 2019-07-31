import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const NavContainer = styled.div`{
  display: flex;
  flex-grow: 1;
  justify-content: space-between;
}`

const Navbar = styled(({ children, className, renderBrand }) => (
  <div className={className}>
    {renderBrand && renderBrand()}

    <NavContainer>
      {children}
    </NavContainer>
  </div>
))`{
  width: inherit;
  display: flex;
  align-items: center;
}`

Navbar.propTypes = {
  /** The home page icon. */
  renderBrand: PropTypes.func
}

Navbar.displayName = 'Navbar'

/** @component */
export default Navbar
