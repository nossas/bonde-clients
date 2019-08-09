import React from 'react'
import PropTypes from 'prop-types'
import { Route } from 'services/auth'
import CommunityPage from './scenes/Community'
import ChatbotModule from './scenes/Chatbot/Module'

const Root = ({ match }) => (
  <React.Fragment>
    <Route exact path={match.path} component={CommunityPage} />
    <Route path={`${match.path}/chatbot`} component={ChatbotModule} />
  </React.Fragment>
)

Root.propTypes = {
  match: PropTypes.any
}

export default Root
