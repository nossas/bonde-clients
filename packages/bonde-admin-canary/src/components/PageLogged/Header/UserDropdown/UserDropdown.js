import React from 'react'
import PropTypes from 'prop-types'
import {
  Dropdown,
  DropdownItem,
  DropdownHeader,
  Flexbox2 as Flexbox,
  Icon,
  Text
} from 'bonde-styleguide'
// import { Link } from 'react-router-dom'

const UserDropdown = ({ t, user, logout }) => {
  const name = `${user.firstName} ${user.lastName}`

  return (
    <Dropdown label={name}>
      <DropdownHeader>
        <img
          src={user.avatar || 'http://via.placeholder.com/35x35?text=U'}
          alt={name}
          width='35'
          height='35'
        />
        <Flexbox vertical>
          <span>{name}</span>
          <Text fontSize={13} color='rgb(160, 157, 157)'>{user.email}</Text>
        </Flexbox>
      </DropdownHeader>
      {/* TODO: add when migrate feature of edit profile
      <DropdownItem component={Link} to='/admin/profile'>
        <Icon name='user' />{t('dropdown.items.profile')}
      </DropdownItem>
      */}
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
    avatar: PropTypes.string,
    email: PropTypes.string
  }).isRequired,
  t: PropTypes.func,
  logout: PropTypes.func
}

export default UserDropdown
