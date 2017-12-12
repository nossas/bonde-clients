import '~client/styles/main.scss'

import React from 'react'
import { Link } from 'react-router-dom'
import { renderRoutes } from 'react-router-config'

import AuthRedirectStrategy from '~root/routes-v1/auth-redirect-strategy'

import Application from '~routes/admin/container.connected'
import BackgroundContainer from '~routes/admin/not-authenticated/background.connected'
import CurrentUserContainer from '~routes/admin/authenticated/container'

import AccountLogin from '~routes/admin/not-authenticated/account-login/page.connected'
import CommunityList from '~routes/admin/authenticated/external/community-list/page.connected'
import NotFound from '~client/components/not-found'

const Home = ({ route }) => (
  <div>
    <h2>Home</h2>
  </div>
)

const Child = ({ route }) => (
  <div>
    <h2>Child</h2>
    <Link to='/'>
      Home
    </Link>
    {/* child routes won't render without this */}
    {renderRoutes(route.routes, { someProp: 'these extra props are optional' })}
  </div>
)

const GrandChild = ({ someProp, ...rest }) => {
  return (
    <div>
      <h3>Grand Child</h3>
      <pre>{JSON.stringify(someProp)}</pre>
    </div>
  )
}

const routes = [
  { component: Application,
    routes: [
      {
        component: CurrentUserContainer,
        routes: [
          {
            path: '/',
            exact: true,
            component: AuthRedirectStrategy
          },
          {
            path: '/',
            component: BackgroundContainer,
            routes: [
              {
                path: '/login',
                exact: true,
                component: AccountLogin
              },
              {
                path: '/community',
                exact: true,
                component: CommunityList
              },
              {
                path: '*',
                component: NotFound
              }
            ]
          }
        ]
      },

      {
        path: '/child/:id',
        component: Child,
        routes: [
          {
            path: '/child/:id/grand-child',
            component: GrandChild
          }
        ]
      }
    ]
  }
]

export default routes
