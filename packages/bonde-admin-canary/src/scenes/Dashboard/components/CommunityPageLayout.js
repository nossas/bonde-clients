import React from 'react'
import { withRouter } from 'react-router'
import { PageLayout } from 'services/router'
import UserCommunities from './UserCommunities'
import CommunitiesDropdown from './CommunitiesDropdown'


const CommunityPageLayout = withRouter(
  ({ location, history, pageProps, loading: Loading, ...rest }) => (
    <UserCommunities component={
      ({ communities, loading }) => {
        if (loading && Loading) return <Loading />

        // selecionar comunidade de acordo com identificador no pathname
        const matches = location.pathname.match(/^\/admin\/\d+/g)
        let communityId = null
        if (matches && matches.length === 1) {
          communityId = Number(matches[0].replace('/admin/', ''))
        }

        // manipular renderização do Header de PageLayout
        const newPageProps = {
          ...pageProps,
          dropdown: () => (
            <CommunitiesDropdown
              communities={communities}
              communityId={communityId}
              onChange={c => {
                if (c.id !== communityId) {
                  history.push(`/admin/${c.id}`)
                }
              }}
            />
          )
        }

        // extender PageLayout com novo Header contendo CommunitiesDropdown
        return <PageLayout pageProps={newPageProps} {...rest} />
      }}
    />
  )
)

export default CommunityPageLayout