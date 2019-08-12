import React from 'react'

export { default as CommunityPageLayout } from './CommunityPageLayout'
export { default as CommunityMenu } from './CommunityMenu'
export { default as ImageColumn } from './ImageColumn'
export { default as UserCommunities } from './UserCommunities'
export { default as FormPage } from './FormPage'

export const Page = ({ community, title }) => (
  <h2>{community.name} | {title}</h2>
)