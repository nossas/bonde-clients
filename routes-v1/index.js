import '~client/styles/main.scss'
import React from 'react'
import { Link } from 'react-router-dom'
import { renderRoutes } from 'react-router-config'
import Application from '~routes/admin/container.connected'
import AccountLogin from '~routes/admin/not-authenticated/account-login/page.connected'
import BackgroundContainer from '~routes/admin/not-authenticated/background.connected'

// const Root = props => (
//   <div>
//     <Application {...props}>
//       <h1>Root</h1>
//       <Link to='/child/1'>
//         Child 1
//       </Link>
//       {/* child routes won't render without this */}
//       {renderRoutes(props.route.routes)}
//     </Application>
//   </div>
// )

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
  console.log('rest', rest)
  return (
    <div>
      <h3>Grand Child</h3>
      <pre>{JSON.stringify(someProp)}</pre>
    </div>
  )
}

const LoginWithBackground = props => (
  <BackgroundContainer {...props}>
    <AccountLogin {...props} />
  </BackgroundContainer>
)

const routes = [
  { component: Application,
    routes: [
      {
        path: '/',
        exact: true,
        component: Home
      },
      {
        path: '/login',
        component: LoginWithBackground
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

// const routes = [
//   { component: Root,
//     routes: [
//       { path: '/', exact: true, component: Home },
//       { path: '/home', component: Home },
//       { path: '/list', component: List }
//     ]
//   }
// ]

export default routes
