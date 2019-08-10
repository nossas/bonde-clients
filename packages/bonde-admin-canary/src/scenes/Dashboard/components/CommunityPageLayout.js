import React from 'react'
import { withRouter } from 'react-router'
import { PageLayout } from 'services/router'
import UserCommunities from './UserCommunities'
import CommunitiesDropdown from './CommunitiesDropdown'


/**
  * CommmunityPageLayout renders a module application, here
  * on UI receive a new dropdown in Header and create a context
  * of community that will be like componentProps to component
  * render. 
  * 
  */
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
        const community = communities.filter(c => c.id === communityId)[0]
        return (
          <PageLayout
            pageProps={newPageProps}
            componentProps={{ community }}
            {...rest}
          />
        )
      }}
    />
  )
)

export default CommunityPageLayout