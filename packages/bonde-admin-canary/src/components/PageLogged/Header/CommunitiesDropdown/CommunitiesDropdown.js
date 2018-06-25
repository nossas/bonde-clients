import React from 'react'
import PropTypes from 'prop-types'
import urljoin from 'url-join'
import { Link } from 'react-router-dom'
import { Dropdown, DropdownItem } from 'bonde-styleguide'
import { I18n } from 'react-i18next'
import { Queryset } from 'components'
import allUserCommunities from './query.graphql'

const CommunitiesDropdown = ({ communities, path }) => {
  return (
    <I18n ns='header'>
      {t => (
        <Dropdown
          label={t('dropdown.label.communities')}
          disabled={communities.length > 0 ? false : true}
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
}

CommunitiesDropdown.defaultProps = {
  communities: []
}

CommunitiesDropdown.propTypes = {
  path: PropTypes.string.isRequired,
  communities: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string
  }))
}

const CommunitiesDropdownQueryset = ({ path }) => (
  <Queryset
    query={allUserCommunities}
    filter={{ orderBy: 'NAME_ASC' }}
  >
    {({ loading, data, filter, onChangeFilter }) => (
      <CommunitiesDropdown
        path={path}
        loading={loading}
        filter={filter}
        onChangeFilter={onChangeFilter}
        communities={data && data.query ? data.query.nodes : []}
      />
    )}
  </Queryset>
)

export default CommunitiesDropdownQueryset
