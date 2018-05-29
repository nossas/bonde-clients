import React from 'react'
import { translate } from '../../../../../services/i18n'
import { Query } from 'react-apollo'
import CommunitiesDropdown from './Communities'
import ALL_COMMUNITIES from './allCommunities.graphql'


const CommunitiesAsync = (props) => (
  <Query query={ALL_COMMUNITIES}>
    {({ loading, error, data }) => (
      <CommunitiesDropdown
        data={data && data.allCommunities ? data.allCommunities.nodes : []}
        {...props}
      />
    )}
  </Query>
)

export default translate('header')(CommunitiesAsync)
