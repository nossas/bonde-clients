import { propType } from 'graphql-anywhere'
import AllCommunities from './AllCommunities.gql'
import {
  CommunitiesDropdownCommunity,
  CommunitiesGadgetCommunity
} from './fragments'

export default {
  query: AllCommunities,
  props: ({ loading, data }) => {
    return {
      loading,
      communities: data && data.allCommunities
        ? data.allCommunities.nodes
        : undefined
    }
  },
  propTypes: {
    CommunitiesDropdownCommunity: propType(CommunitiesDropdownCommunity),
    CommunitiesGadgetCommunity: propType(CommunitiesGadgetCommunity)
  }
}
