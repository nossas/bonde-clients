
import React from 'react'
import PropTypes from 'prop-types'
import { Query } from 'react-apollo'
// import { I18n } from 'react-i18next'
import { Redirect } from 'react-router-dom'
import { graphqlApi } from 'services/graphql'
import authSession from './session'
import CurrentUserQuery from './currentUser.graphql'

const AuthContext = React.createContext()

export const { Consumer } = AuthContext

const getUserWithTags = (currentUser) => ({
  ...currentUser,
  tags: JSON.parse(currentUser.tags).filter(t => {
    if (typeof t === 'string') return true
    else return false
  })
})

class AuthProvider extends React.Component {
  constructor (props) {
    super(props)
    this.state = { redirect: false }
    this.authErrors = [
      'Token invalid, user not found.',
      'Signature verification failed',
      'Invalid audience',
      'jwt expired'
    ]
  }

  handleLogout () {
    return authSession
      .logout()
      .then(() => {
        graphqlApi.resetStore()
        this.setState({ redirect: true })
      })
  }

  render () {
    // eslint-disable-next-line no-unused-vars
    const { children, loading: Loading } = this.props
    if (this.state.redirect) return <Redirect to={{ pathname: '/auth/login' }} />

    return (
      <Query query={CurrentUserQuery}>
        {({ data, loading, error }) => {
          if (loading) return <Loading />
          // eslint-disable-next-line no-console
          console.log('error', error)
          const hasError = (typeof error === 'object' && this.authErrors.indexOf(error.graphQLErrors[0].message) !== -1)
          if (hasError || !data || !data.currentUser) {
            this.handleLogout()
            return <Redirect to={{ pathname: '/auth/login' }} />
          }

          return (
            <AuthContext.Provider
              value={{
                user: data.currentUser ? getUserWithTags(data.currentUser) : undefined,
                logout: () => {
                  this.handleLogout()
                    .then(() => {
                      this.forceUpdate()
                    })
                }
              }}
            >
              {children}
            </AuthContext.Provider>
          )
        }}
      </Query>
    )
  }
}

AuthProvider.propTypes = {
  children: PropTypes.node,
  loading: PropTypes.any,
  t: PropTypes.func
}

export default AuthProvider
