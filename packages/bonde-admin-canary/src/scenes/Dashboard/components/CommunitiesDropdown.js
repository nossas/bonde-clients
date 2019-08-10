import React from 'react'
import PropTypes from 'prop-types'
import { I18n } from 'react-i18next'
import urljoin from 'url-join'
import { Link } from 'react-router-dom'
import { Dropdown, DropdownItem } from 'bonde-styleguide'

const CommunitiesDropdown = ({ communities, path }) => (
  <I18n ns='home'>
    {t => (
      <Dropdown
        label={t('dropdown.label.communities')}
        disabled={!(communities.length > 0)}
      >
        {communities.map(c => (
          <DropdownItem
            key={`communities-dropdown-${c.i}`}
            to={path && urljoin(path, c.id.toString())}
            component={Link}
          >
            {c.name}
          </DropdownItem>
        ))}
      </Dropdown>
    )}
  </I18n>
)

CommunitiesDropdown.defaultProps = {
  communities: []
}

CommunitiesDropdown.propTypes = {
  path: PropTypes.string.isRequired,
  communities: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string
  })),
}

export default CommunitiesDropdown