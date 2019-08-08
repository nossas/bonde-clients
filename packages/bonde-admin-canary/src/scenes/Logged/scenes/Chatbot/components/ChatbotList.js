import React from 'react'
import PropTypes from 'prop-types'
import { Query } from 'react-apollo'
import { chatbotsQuery } from '../graphql'

const ChatbotList = ({ communityId, dataListComponent: DataListComponent }) => {
  return (
    <Query query={chatbotsQuery} variables={{ communityId }}>
      {({ loading, error, data }) => {
        if (loading) return 'Loading...'
        if (error) return `Error! ${error.message}`

        return <DataListComponent chatbots={data.chatbots} />
      }}
    </Query>
  )
}

ChatbotList.propTypes = {
  communityId: PropTypes.number.isRequired,
  dataListComponent: PropTypes.any
}

export default ChatbotList
