import { GraphQLClient } from 'graphql-request';

const API_URL: any = import.meta.env.VITE_DOMAIN_API_GRAPHQL || "";

const API_TOKEN: any = import.meta.env.VITE_API_GRAPHQL_TOKEN || "";

// eslint-disable-next-line @typescript-eslint/no-unsafe-argument
export default new GraphQLClient(API_URL, {
  headers: {
    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
    authorization: `Bearer ${API_TOKEN}`
  }
});