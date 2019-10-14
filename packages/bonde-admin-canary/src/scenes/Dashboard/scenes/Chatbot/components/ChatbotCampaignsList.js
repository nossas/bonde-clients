import React from 'react'
import PropTypes from 'prop-types'
import { Query } from 'react-apollo'
import qs from 'query-string'
import { chatbotCampaignsQuery } from '../graphql'
import CampaignsList from './CampaignsList'

const ChatbotCampaignsList = ({ chatbotId, queryParams, dataListComponent: DataListComponent, ...rest }) => {
  const variables = { chatbotId }
  const params = qs.parse(queryParams)

  if (params.filter) {
    variables.filter = params.filter
  }

  return (
    <Query query={chatbotCampaignsQuery} variables={variables}>
      {({ loading, error, data }) => {
        if (loading) return 'Loading...'
        if (error) return `Error! ${error.message}`

        return (
          <DataListComponent
            chatbotCampaigns={data.chatbot_campaigns}
            params={params}
            {...rest}
          />
        )
      }}
    </Query>
  )
}

ChatbotCampaignsList.propTypes = {
  chatbotId: PropTypes.number.isRequired,
  queryParams: PropTypes.any,
  dataListComponent: PropTypes.any
}

ChatbotCampaignsList.defaultProps = {
  dataListComponent: CampaignsList
}

export default ChatbotCampaignsList
