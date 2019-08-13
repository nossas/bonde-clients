import React from 'react'
import PropTypes from 'prop-types'

export { default as CommunityPageLayout } from './CommunityPageLayout'
export { default as CommunityMenu } from './CommunityMenu'
export { default as FullPageLayout } from './FullPageLayout'
export { default as ImageColumn } from './ImageColumn'
export { default as UserCommunities } from './UserCommunities'
export { default as FormPage } from './FormPage'

export const Page = ({ community, title }) => (
  <h2>{community.name} | {title}</h2>
)

Page.propTypes = {
  community: PropTypes.shape({
    name: PropTypes.string
  }),
  title: PropTypes.string
}
