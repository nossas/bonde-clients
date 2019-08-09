import React from 'react'
import PropTypes from 'prop-types'
import { Route } from 'services/auth'
import ChatbotListPage from './scenes/ChatbotList'
import ChatbotEditModule from './scenes/ChatbotEdit'

const Root = ({ match }) => (
  <React.Fragment>
    <Route exact path={match.path} component={ChatbotListPage} />
    <Route path={match.path} component={ChatbotEditModule} />
  </React.Fragment>
)

Root.propTypes = {
  match: PropTypes.any
}

export default Root
