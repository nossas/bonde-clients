import React from 'react'
import { translate } from '../../../../../services/i18n'
import { Query } from 'react-apollo'
import CommunitiesDropdown from './Communities'
import { AllCommunities } from 'graphql/queries'


const CommunitiesAsync = (props) => (
  <Query query={AllCommunities}>
    {({ loading, error, data }) => (
      <CommunitiesDropdown
        data={data && data.allCommunities ? data.allCommunities.nodes : []}
        {...props}
      />
    )}
  </Query>
)

export default translate('header')(CommunitiesAsync)
