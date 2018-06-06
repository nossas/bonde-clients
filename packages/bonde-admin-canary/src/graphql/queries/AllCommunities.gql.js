import gql from 'graphql-tag'
import {
  CommunitiesDropdownCommunity,
  CommunitiesGadgetCommunity
} from '../fragments'

export default gql`
query AllCommunities {
  allCommunities {
    nodes {
      ...CommunitiesDropdownCommunity
      ...CommunitiesGadgetCommunity
    }
  }
}
${CommunitiesDropdownCommunity}
${CommunitiesGadgetCommunity}
`
