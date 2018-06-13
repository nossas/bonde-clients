import React from 'react'
import PropTypes from 'prop-types'
import { Dropdown, DropdownItem, DropdownHeader, Icon } from 'bonde-styleguide'
import { Link } from 'react-router-dom'

const UserDropdown = ({ t, user, logout }) => {
  
  const name = `${user.firstName} ${user.lastName}`
  
  return (
    <Dropdown label={name} icon='sound' width={190}>
      <DropdownHeader>
        <img
          src={user.avatar || 'http://via.placeholder.com/35x35?text=U'}
          alt={ name}
        />
        <span>{name}</span>
      </DropdownHeader>
      <DropdownItem component={Link} to='/admin/profile'>
        <Icon name='user' />{t('dropdown.items.profile')}
      </DropdownItem>
      <DropdownItem onClick={logout}>
        <Icon name='times' />{t('dropdown.items.logout')}
      </DropdownItem>
    </Dropdown>
  )
}

UserDropdown.propTypes = {
  user: PropTypes.shape({
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    avatar: PropTypes.string
  }).isRequired
}

export default UserDropdown
