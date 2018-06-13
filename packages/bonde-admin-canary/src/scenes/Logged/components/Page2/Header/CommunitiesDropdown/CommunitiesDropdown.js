import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { Dropdown, DropdownItem } from 'bonde-styleguide'
import urljoin from 'url-join'
import { AllCommunities } from 'graphql/queries'

const CommunitiesDropdown = ({ communities, path, t }) => {
  return (
    <Dropdown
      label={t('dropdown.label.communities')}
      disabled={communities.length > 0 ? false : true}
    >
      {communities.map((c, i) => (
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

CommunitiesDropdown.defaultProps = {
  communities: []
}

CommunitiesDropdown.propTypes = {
  path: PropTypes.string.isRequired,
  communities: PropTypes.arrayOf(
    AllCommunities.propTypes.CommunitiesDropdownCommunity
  )
}

export default CommunitiesDropdown
