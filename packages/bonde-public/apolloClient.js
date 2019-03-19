import 'isomorphic-fetch'
import { ApolloClient, createNetworkInterface } from 'react-apollo'
import getConfig from 'next/config'

const { publicRuntimeConfig } = getConfig()

const networkInterface = createNetworkInterface({
  uri: publicRuntimeConfig.domainApiGraphql || 'http://api-v2.bonde.devel',
  connectToDevTools: true
})

export default (options = {}) => new ApolloClient({
  networkInterface,
  ...options
})
