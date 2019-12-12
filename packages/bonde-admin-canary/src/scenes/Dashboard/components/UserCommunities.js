import React from 'react'
import PropTypes from 'prop-types'
import { Query } from 'react-apollo'
import { connect } from 'react-redux'
import { allUserCommunitiesQuery } from 'scenes/Dashboard/graphql'
import { Auth } from 'services/auth'

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

const UserCommunities = ({ loading: Loading, component: Component, offset, setOffset, ...rest }) => (
  <Auth>
    {({ user }) => (
      <Query query={allUserCommunitiesQuery} variables={{ offset, user_id: user.id }}>
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
    )}
  </Auth>
)

UserCommunities.propTypes = {
  loading: PropTypes.any,
  component: PropTypes.any,
  offset: PropTypes.number,
  setOffset: PropTypes.func
}

const mapStateToProps = (state) => ({
  user: state.auth.user,
  offset: state.pagination.offset
})

const mapDispatchToProps = (dispatch) => ({
  setOffset: (offset) => {
    dispatch({ type: 'Pagination/REGISTER', payload: offset })
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(UserCommunities)
