import React from 'react'
import { Query } from 'react-apollo'
import { I18n } from 'react-i18next'
import { Redirect } from 'react-router-dom'
import { graphqlApi } from 'services/graphql'
import authSession from './session'
import CurrentUserQuery from './currentUser.graphql'

const AuthContext = React.createContext()

export const { Consumer } = AuthContext

const getUserWithTags = ({ currentUser }) => ({
  ...currentUser,
  tags: JSON.parse(currentUser.tags).filter(t => {
    if (typeof t === 'string') return true
    else return false
  })
})

class AuthProvider extends React.Component {
  state = { redirectToReferrer: false } 
  
  render () {
    const { children, loading: Loading } = this.props

    if (this.state.redirectToReferrer) {
      return <Redirect to={{ pathname: '/auth/login' }} />
    }

    return (
      <I18n ns='auth'>
        {(t) => (
          <Query query={CurrentUserQuery}>
            {({ loading, error, data }) => {
              
              if (loading) return <Loading />
              
              if (error || !data) {
                console.log('[ERROR: AuthProvider]', error)
                return <h2>Houve algum problema na conexão GraphQL</h2>
              }

              return (
                <AuthContext.Provider
                  value={{
                    user: getUserWithTags(data),
                    logout: () => authSession
                      .logout()
                      .then(() => {
                        graphqlApi.resetStore()
                        this.setState({ redirectToReferrer: true })
                      })
                  }}
                >
                  {children}
                </AuthContext.Provider>
              )
            }}
          </Query>
        )}
      </I18n>
    )
  }
}

export default AuthProvider
