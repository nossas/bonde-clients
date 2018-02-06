import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import * as Icon from './Icon'
import Dropdown, {
  Item as DropdownItem,
  Header as DropdownHeader
} from '../src/Dropdown'

const Nav = styled.nav`{
  position: fixed;
  width: inherit;
  min-height: 80px;
  background: #000;
  padding: 0 155px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}`

const UserDropdown = ({ user }) => {
  
  const fullName = user.last_name
    ? `${user.first_name} ${user.last_name}`
    : user.first_name

  return (
    <Dropdown label={fullName} icon={Icon.Sound} width={190}>
      <DropdownHeader>
        <img src={user.avatar} alt={fullName} />
        <span>{fullName}</span>
      </DropdownHeader>
      <DropdownItem>
        <Icon.User /> Perfil
      </DropdownItem>
      <DropdownItem>
        <Icon.Times /> Sair
      </DropdownItem>
    </Dropdown>
  )
}

const Navbar = ({ user }) => (
  <Nav>
    <a href='#' title='Bonde.org'>
      <Icon.Bonde />
    </a>
    {user && <UserDropdown user={user} />}
  </Nav>
)

Navbar.propTypes = {
  user: PropTypes.object
}

export default Navbar
