import gql from 'graphql-tag'

export default gql`
query CurrentUserCommunities (
  $offset: Int,
  $limit: Int,
  $orderBy: [UserCommunitiesOrderBy!]
) {
  allUserCommunities (offset: $offset, first: $limit, orderBy: $orderBy) {
    nodes {
      id
      name
      city
      description
      image
      createdAt
      updatedAt
      mailchimpApiKey
      mailchimpListId
      mailchimpGroupId
      fbLink
      twitterLink
      facebookAppId
      emailTemplateFrom
      modules
    }
    totalCount
  }
}
`
