import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Query } from 'react-apollo'
import { allUserCommunitiesQuery } from 'scenes/Dashboard/graphql'

const parseBankAccount = (communities) => communities.map(community => {
  if (community.recipient) {
    const getValue = (key) => community.recipient.bank_account[key]

    return {
      ...community,
      recipient: {
        ...community.recipient,
        bank_account: {
          id: getValue('id'),
          object: getValue('object'),
          type: getValue('type'),
          bank_code: getValue('bank_code'),
          agency: getValue('agencia'),
          agency_dig: getValue('agencia_dv'),
          account: getValue('conta'),
          account_dig: getValue('conta_dv'),
          document_type: getValue('document_type'),
          document_number: getValue('document_number'),
          legal_name: getValue('legal_name'),
          charge_transfer_fees: getValue('charge_transfer_fees'),
          date_created: getValue('date_created')
        }
      }
    }
  }
  return community
})

const UserCommunities = ({ loading: Loading, component: Component, ...rest }) => {
  const [offset, setOffset] = useState(0)
  return (
    <Query query={allUserCommunitiesQuery} variables={{ offset }}>
      {({ data, loading, error }) => {
        if (loading && Loading) return <Loading />
        if (error) return <span>{error}</span>

        // LIMIT OF QUERY HARD SET LIKE 20
        const communities = data && data.communities ? parseBankAccount(data.communities) : []
        const count = data && data.communities_aggregate ? data.communities_aggregate.aggregate.count : 0

        return (
          <Component
            communities={communities}
            count={count}
            offset={offset}
            loading={loading}
            setOffset={setOffset}
            {...rest}
          />
        )
      }}
    </Query>
  )
}

UserCommunities.propTypes = {
  loading: PropTypes.any,
  component: PropTypes.any
}

export default UserCommunities
