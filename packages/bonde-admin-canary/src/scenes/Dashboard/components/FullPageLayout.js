import React from 'react'
import PropTypes from 'prop-types'
import { Flexbox2 as Flexbox, Spacing } from 'bonde-styleguide'
import UserCommunities from './UserCommunities'
import CommunitiesDropdown from './CommunitiesDropdown'
import CommunityMenu from './CommunityMenu'
import CommunityPageTabs from './CommunityPageTabs'
import { Route } from 'react-router'
import { Page } from 'components/PageLogged'

/**
  * FullPageLayout renders a module application, here
  * on UI receive a new dropdown in Header and create a context
  * of community that will be like componentProps to component
  * render.
  *
  */
const FullPageLayout = ({ component: Component, componentProps, pageProps, tabs, loading: Loading, ...rest }) => (
  <UserCommunities component={
    ({ communities, loading }) => {
      if (loading && Loading) return <Loading />
      // implementar configurações por roteamento
      return (
        <Route {...rest} render={
          (matchProps) => {
            // buscar comunidade por parametro na URL
            const { communityId } = matchProps.match.params
            const community = communities.filter(c => c.id === Number(communityId))[0]
            // configurar propriedades de renderização da página
            const newPageProps = {
              ...pageProps,
              // eslint-disable-next-line react/display-name
              tabs: tabs ? () => (
                <CommunityPageTabs
                  location={matchProps.location}
                  baseUrl={matchProps.match.url}
                  community={community}
                  tabs={tabs}
                />
              ) : undefined,
              // eslint-disable-next-line react/display-name
              dropdown: () => (
                <Flexbox horizontal>
                  <CommunitiesDropdown
                    communities={communities}
                    communityId={community.id}
                    onChange={c => {
                      if (c.id !== community.id) {
                        matchProps.history.push(
                          matchProps
                            .location
                            .pathname
                            .replace(/admin\/[0-9]+/, `admin/${c.id}`)
                        )
                      }
                    }}
                  />
                  <Spacing margin={{ left: 10 }}>
                    <CommunityMenu
                      dark
                      pathname={matchProps.match.url}
                      community={community}
                    />
                  </Spacing>
                </Flexbox>
              )
            }

            return (
              <Page {...newPageProps}>
                <Component {...matchProps} {...componentProps} community={community} />
              </Page>
            )
          }}
        />
      )
    }}
  />
)

const { any, array, object } = PropTypes

FullPageLayout.propTypes = {
  pageProps: object,
  component: any,
  componentProps: object,
  loading: any,
  tabs: array
}

export default FullPageLayout
