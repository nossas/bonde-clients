import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { Dropdown, DropdownItem } from 'bonde-styleguide'
import urljoin from 'url-join'

const Communities = ({ data, path, t }) => {
  return (
    <Dropdown
      label={t('dropdown.label.communities')}
      disabled={data && data.length > 0 ? false : true}
    >
      {data.map((c, i) => (
        <DropdownItem
          key={`communities-dropdown-${i}`}
          to={path && urljoin(path, c.id.toString())}
          component={Link}
        >
          {c.name}
        </DropdownItem>
      ))}
    </Dropdown>
  )
}

Communities.defaultProps = {
  data: []
}

Communities.propTypes = {
  path: PropTypes.string.isRequired,
  communities: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired
    })
  )
}

export default Communities
