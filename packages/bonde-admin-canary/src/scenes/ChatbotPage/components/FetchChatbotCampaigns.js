import PropTypes from 'prop-types'
import qs from 'query-string'
import { useQuery } from 'bonde-core-tools'
import { chatbotCampaignsQuery } from '../graphql'

const FetchChatbotCampaigns = ({ children, chatbotId, queryParams, ...rest }) => {
  const params = qs.parse(queryParams)
  const variables = {
    chatbotId,
    filter: params.filter ? params.filter : undefined
  }
  const { loading, error, data } = useQuery(chatbotCampaignsQuery, { variables })

  if (loading) return 'Loading...'
  if (error) return `Error! ${error.message}`

  return children({ campaigns: data.chatbot_campaigns, params, ...rest })
}

FetchChatbotCampaigns.propTypes = {
  chatbotId: PropTypes.number.isRequired,
  queryParams: PropTypes.any
}

export default FetchChatbotCampaigns
