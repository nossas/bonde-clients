import { ApolloClient, createNetworkInterface } from 'react-apollo'

const GRAPHQL_URL = process.env.REACT_APP_DOMAIN_API_GRAPHQL !== undefined
  ? process.env.REACT_APP_DOMAIN_API_GRAPHQL
  : 'http://api-v2.bonde.devel'

const networkInterface = createNetworkInterface({
  uri: GRAPHQL_URL,
  connectToDevTools: true
})

export default (options = {}) => new ApolloClient({
  networkInterface,
  ...options
})
