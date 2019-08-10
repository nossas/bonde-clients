import React from 'react'
import PropTypes from 'prop-types'
import {
  Dropdown,
  DropdownItem,
  Flexbox2 as Flexbox
} from 'bonde-styleguide'

const CommunityItem = ({ community }) => (
  <Flexbox horizontal middle>
    <img
      style={{ marginRight: '15px' }}
      src={community.image || 'https://via.placeholder.com/24/'}
      alt={community.name}
      width={24}
      heigth={24}
    />
    <span>{community.name}</span>
  </Flexbox>
)

const CommunitiesDropdown = ({ communities, communityId, onChange }) => {
  const community = communities.filter(c => c.id === communityId)[0]

  return (
    <Dropdown label={() => <CommunityItem community={community} />}>
      {communities.map(c => (
        <DropdownItem key={`c-dropdown-${c.id}`} onClick={() => onChange(c)}>
          <CommunityItem community={c} />
        </DropdownItem>
      ))}
    </Dropdown>
  )
}

CommunitiesDropdown.defaultProps = {
  communities: []
}

const { arrayOf, shape, number, string, func } = PropTypes

CommunitiesDropdown.propTypes = {
  communities: arrayOf(
    shape({ id: number, name: string })
  ),
  communityId: number,
  onChange: func.isRequired
}

export default CommunitiesDropdown