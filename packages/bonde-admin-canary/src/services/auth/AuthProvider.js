import React from 'react'
import { Query } from 'react-apollo'
import { I18n } from 'react-i18next'
import { connect } from 'services/redux'
import { graphqlApi } from 'services/graphql'
import AuthAPI from './api'
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

const AuthProvider = ({ children, loading: Loading, logout }) => (
  <I18n ns='auth'>
    {(t) => (
      <Query query={CurrentUserQuery}>
        {({ loading, error, data }) => {
          
          if (loading) return <Loading message={t('loading.currentUser')} />
          
          if (error || !data) {
            console.log('[ERROR: AuthProvider]', error)
            return <h2>Voce não deve ter acesso a essa página</h2>
          }

          return (
            <AuthContext.Provider
              value={{
                user: getUserWithTags(data),
                logout
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

export default connect(undefined, {
  logout: () => {
    AuthAPI
      .logout()
      .then(() => {
        graphqlApi.resetStore()
      })
  }
})(AuthProvider)
