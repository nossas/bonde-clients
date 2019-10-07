import React from 'react'
import PropTypes from 'prop-types'
import {
  Dropdown,
  DropdownItem,
  Flexbox2 as Flexbox
} from 'bonde-styleguide'
import ImageColumn from './ImageColumn'

const CommunityItem = ({ community }) => (
  <Flexbox horizontal middle justify='end'>
    <ImageColumn
      value={community.image}
      padding=''
      size={30}
    />
    <span style={{ marginLeft: '10px' }}>{community.name}</span>
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

const CommunityType = shape({
  id: number,
  name: string
})

CommunityItem.propTypes = {
  community: CommunityType
}

CommunitiesDropdown.propTypes = {
  communities: arrayOf(CommunityType),
  communityId: number,
  onChange: func.isRequired
}

export default CommunitiesDropdown
