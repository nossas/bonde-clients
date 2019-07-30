import React from 'react'
import PropTypes from 'prop-types'
// import { Query } from 'react-apollo'
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
    this.state = { fetching: true, user: undefined }
  }

  componentDidMount () {
    graphqlApi
      .query({ query: CurrentUserQuery })
      .then(({ data }) => {
        this.setState({ user: data.currentUser, fetching: false })
        this.forceUpdate()
      })
      .catch(error => {
        const authErrors = [
          'Token invalid, user not found.',
          'Signature verification failed',
          'Invalid audience'
        ]

        if (typeof error === 'object' && authErrors.indexOf(error.graphQLErrors[0].message) !== -1) {
          this.handleLogout()
        }
      })
  }

  handleLogout () {
    return authSession
      .logout()
      .then(() => {
        graphqlApi.resetStore()
        this.setState({ fetching: false, user: undefined })
      })
  }

  render () {
    // eslint-disable-next-line no-unused-vars
    const { children, loading: Loading } = this.props
    const { user, fetching } = this.state

    if (!user && !fetching) {
      return <Redirect to={{ pathname: '/auth/login' }} />
    }

    return (
      <AuthContext.Provider
        value={{
          user: user ? getUserWithTags(user) : undefined,
          logout: this.handleLogout.bind(this)
        }}
      >
        {fetching ? <Loading /> : children}
      </AuthContext.Provider>
    )
  }
}

AuthProvider.propTypes = {
  children: PropTypes.node,
  loading: PropTypes.any,
  t: PropTypes.func
}

export default AuthProvider
