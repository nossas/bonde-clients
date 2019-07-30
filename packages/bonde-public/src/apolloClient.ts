import 'isomorphic-fetch'
import ApolloClient from 'apollo-client'
import { createHttpLink } from 'apollo-link-http'
import getConfig from 'next/config'
import { InMemoryCache } from 'apollo-cache-inmemory'

const { publicRuntimeConfig } = getConfig()

const link = createHttpLink({
  uri: publicRuntimeConfig.domainApiGraphql || 'http://api-v2.bonde.devel'
})

const cache = new InMemoryCache()

export default new ApolloClient({
  link,
  cache,
  connectToDevTools: true
})
