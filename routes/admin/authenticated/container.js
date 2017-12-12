import React, { Component } from 'react'
import { connect } from 'react-redux'
import { graphql } from 'react-apollo'
import { renderRoutes } from 'react-router-config'
import { Loading } from '~client/components/await'
import { load } from '~client/account/redux/action-creators'
import fetchCurrentUser from '~client/account/queries/current-user'
import AuthSelectors from '~client/account/redux/selectors'

class CurrentUserContainer extends Component {
  componentWillReceiveProps (nextProps, nextState) {
    const { currentUser } = this.props.data
    const { currentUser: nextCurrentUser } = nextProps.data

    if ((!currentUser && nextCurrentUser) || (currentUser && currentUser !== nextCurrentUser)) {
      this.props.load(nextCurrentUser)
    }
  }

  render () {
    const { route, data: { loading, currentUser } } = this.props
    return (
      <div className='current-user-container'>
        {loading && !currentUser ? <Loading /> : (renderRoutes(route.routes))}
      </div>
    )
  }
}

const mapStateToProps = state => ({
  user: AuthSelectors(state).getUser()
})

export default graphql(fetchCurrentUser, {
  options: {
    fetchPolicy: 'network-only'
  }
})(
  connect(mapStateToProps, { load })(CurrentUserContainer)
)
