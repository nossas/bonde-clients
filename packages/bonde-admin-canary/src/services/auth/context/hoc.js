import React from 'react'
import { connect } from 'services/redux'
import { graphqlApi } from 'services/graphql'
import AuthAPI from '../api'
import { AuthContext } from './Context'

const auth = () => Component => (props) => {
  const ComponentRedux = connect(
    undefined,
    {
      logout: () => {
        AuthAPI.logout().then(() => {
          graphqlApi.resetStore()
        })
      }
    }
  )(Component)

  return (
    <AuthContext.Consumer>
      {user => (<ComponentRedux user={user} {...props} />)}
    </AuthContext.Consumer>
  )
}
export default auth
