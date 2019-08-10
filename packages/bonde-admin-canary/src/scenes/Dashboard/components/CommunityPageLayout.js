import React from 'react'
import { PageLayout } from 'services/router'
import UserCommunities from './UserCommunities'
import CommunitiesDropdown from './CommunitiesDropdown'


const CommunityPageLayout = ({ pageProps, ...rest }) => {
  const newPageProps = {
    ...pageProps,
    dropdown: <UserCommunities component={CommunitiesDropdown} />
  }
  return (
    <PageLayout pageProps={newPageProps} {...rest} />
  )
}

export default CommunityPageLayout