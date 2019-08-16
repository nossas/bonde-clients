import React from 'react'
import PropTypes from 'prop-types'
import { Query } from 'react-apollo'
import { chatbotCampaignsQuery } from '../graphql'
import CampaignsList from './CampaignsList'

const ChatbotCampaignsList = ({ chatbotId, dataListComponent: DataListComponent }) => {
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

ChatbotCampaignsList.propTypes = {
  chatbotId: PropTypes.number.isRequired,
  dataListComponent: PropTypes.any
}

ChatbotCampaignsList.defaultProps = {
  dataListComponent: CampaignsList
}

export default ChatbotCampaignsList
