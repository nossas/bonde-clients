import { ApolloClient } from 'apollo-client'
import { createHttpLink } from 'apollo-link-http'
import { setContext } from 'apollo-link-context'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { authSession } from 'services/auth'
import { CatchLink, onCatch } from './CatchLink'

const httpLink = createHttpLink({
  uri: process.env.REACT_APP_DOMAIN_API_GRAPHQL || 'http://api-v2.bonde.devel/graphql'
})

const authLink = setContext((_, { headers }) => {
  const authToken = authSession.getToken()

  if (authToken) {
    return {
      headers: {
        ...headers,
        authorization: `Bearer ${authToken}`
      }
    }
  }
})

const logoutInSession = () => {
  const redirectTo = authSession.getItem('redirectTo')
  authSession
    .logout()
    .then(() => {
      if (redirectTo) {
        window.location.href = `/auth/login?next=${redirectTo}`
      } else {
        window.location.href = '/auth/login'
      }
    })
}

const handleError = onCatch(({ networkError, graphQLErrors }) => {
  if (networkError && (networkError.statusCode === 401 || networkError.statusCode === 403)) {
    logoutInSession()
  }
  // eslint-disable-next-line no-console
  console.log('graphQLErrors', graphQLErrors)
  if (graphQLErrors && graphQLErrors.length > 0) {
    // when token has no passed on bonde-webhooks-auth
    if (/field "\w+" not found in type: '\w+'/.test(graphQLErrors[0].message)) {
      logoutInSession()
    }
  }
})

const client = new ApolloClient({
  link: CatchLink.from([
    authLink,
    handleError,
    httpLink
  ]),
  cache: new InMemoryCache()
})

export default client
