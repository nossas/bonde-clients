import { GraphQLClient } from 'graphql-request';

const API_URL = import.meta.env.VITE_DOMAIN_API_GRAPHQL || "";

const API_TOKEN = import.meta.env.VITE_API_GRAPHQL_TOKEN || "";

export default new GraphQLClient(API_URL, {
  headers: {
    authorization: `Bearer ${API_TOKEN}`
  }
});