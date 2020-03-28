import React from 'react'
import PropTypes from 'prop-types'
import gql from 'graphql-tag'
import { useQuery } from 'bonde-core-tools'
import Table from './Table'
import InviteForm from './InviteForm'

const InvitationsQuery = gql`
  query InvitationsByCommunity($communityId: Int!) {
    invitations(where: { community_id: { _eq: $communityId } }, order_by: { created_at: desc_nulls_last }) {
      user {
        first_name
        email
      }
      created_at
      role
      email
      expired
      expires
    }
  }
`

const FetchInvitations = ({ community }) => {
  const variables = { communityId: community.id }
  const { data, loading, error } = useQuery(InvitationsQuery, { variables })

  if (loading) return <div>Fetching invitations...</div>
  if (error) return <div>Error</div>

  return (
    <>
      <InviteForm onSubmit={values => console.log('values', { values })} />
      <Table data={data.invitations} />
    </>
  )
}

FetchInvitations.propTypes = {
  community: PropTypes.object.isRequired
}

export default FetchInvitations
