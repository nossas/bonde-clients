import React from 'react'
import { graphql } from 'react-apollo'
import { connect } from 'react-redux'
import { Switch } from 'react-router-dom'
import FetchCurrentUser from "../../account/queries/current-user"
import { load } from "../../account/redux/action-creators"
import { Loading } from "../../components/await"
// Routes
import BetaBotPage from './bot'
import CommunityCreatePage from './communities/create'
import PrivateRoute from './private-route'
import SidebarContainer from './sidebar'


class Logged extends React.Component {
  componentDidMount() {
    if (this.props.user) {
      this.props.load(this.props.user)
    }
  }

  componentWillReceiveProps(nextProperties) {
    if (!this.props.user && nextProperties.user) {
      this.props.load(nextProperties.user)
    }
  }

  render() {
    return this.props.loading ? <Loading /> : (
      <Switch>
        <PrivateRoute
          exact
          path='/bot'
          component={BetaBotPage}
        />
        <PrivateRoute
          exact
          path='/communities/new'
          component={CommunityCreatePage}
        />
        <PrivateRoute
          path='/'
          component={SidebarContainer}
        />
      </Switch>
    )
  }
}

const config = {
  options: { fetchPolicy: 'network-only' },
  props: ({ ownProps, data: { loading, currentUser } }) => ({
    loading,
    user: currentUser
  })
}

export default graphql(FetchCurrentUser, config)(
  connect(undefined, { load })(Logged)
)
