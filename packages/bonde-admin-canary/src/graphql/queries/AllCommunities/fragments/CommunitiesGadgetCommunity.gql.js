import gql from 'graphql-tag'

export default gql`
fragment CommunitiesGadgetCommunity on Community {
  id
  name
  image
  description
  city
  updatedAt
}
`
