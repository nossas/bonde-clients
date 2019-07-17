import 'isomorphic-fetch'
import { ApolloClient, createNetworkInterface } from 'react-apollo'
import getConfig from 'next/config'

const networkInterface = createNetworkInterface({
  uri: process.env.REACT_APP_DOMAIN_API_GRAPHQL || 'http://api-v2.bonde.devel',
  connectToDevTools: true
})

export default (options = {}) => new ApolloClient({
  networkInterface,
  ...options
})
