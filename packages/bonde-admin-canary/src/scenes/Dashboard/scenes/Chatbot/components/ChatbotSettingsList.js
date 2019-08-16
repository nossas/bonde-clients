import React from 'react'
import PropTypes from 'prop-types'
import { Query } from 'react-apollo'
import { chatbotSettingsQuery } from '../graphql'

const ChatbotSettingsList = ({ chatbotId, dataListComponent: DataListComponent }) => {
  return (
    <Query query={chatbotSettingsQuery} variables={{ chatbotId }}>
      {({ loading, error, data }) => {
        if (loading) return 'Loading...'
        if (error) return `Error! ${error.message}`

        return <DataListComponent chatbotSettings={data.chatbot_settings} />
      }}
    </Query>
  )
}

ChatbotSettingsList.propTypes = {
  chatbotId: PropTypes.number.isRequired,
  dataListComponent: PropTypes.any
}

export default ChatbotSettingsList
