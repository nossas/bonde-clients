import React from 'react'
import PropTypes from 'prop-types'
import { Query } from 'react-apollo'
import { chatbotCampaignsQuery } from '../graphql'

const ChatbotCampaignssList = ({ chatbotId, dataListComponent: DataListComponent }) => {
  return (
    <Query query={chatbotCampaignsQuery} variables={{ chatbotId }}>
      {({ loading, error, data }) => {
        if (loading) return 'Loading...'
        if (error) return `Error! ${error.message}`

        return <DataListComponent chatbotCampaigns={data.chatbot_campaigns} />
      }}
    </Query>
  )
}

ChatbotCampaignssList.propTypes = {
  chatbotId: PropTypes.number.isRequired,
  dataListComponent: PropTypes.any
}

export default ChatbotCampaignssList
