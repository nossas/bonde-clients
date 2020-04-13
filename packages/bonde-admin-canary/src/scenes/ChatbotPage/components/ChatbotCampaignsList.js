import React from 'react'
import PropTypes from 'prop-types'
import qs from 'query-string'
import { useQuery } from 'bonde-core-tools'
import { chatbotCampaignsQuery } from '../graphql'
import CampaignsList from './CampaignsList'

const ChatbotCampaignsList = ({ chatbotId, queryParams, dataListComponent: DataListComponent, ...rest }) => {
  const params = qs.parse(queryParams)
  const variables = {
    chatbotId,
    filter: params.filter ? params.filter : undefined
  }
  const { loading, error, data } = useQuery(chatbotCampaignsQuery, { variables })

  if (loading) return 'Loading...'
  if (error) return `Error! ${error.message}`

  return (
    <DataListComponent
      chatbotCampaigns={data.chatbot_campaigns}
      params={params}
      {...rest}
    />
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
