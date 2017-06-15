import React, { Component } from 'react'
import { connect } from 'react-redux'
import { gql, graphql } from 'react-apollo'
import { Loading } from '~client/components/await'
import { load } from '~client/account/redux/action-creators'
import fetchCurrentUser from '~client/account/queries/current-user'

class CurrentUserContainer extends Component {

  componentWillReceiveProps(nextProps) {
    if (!this.props.data.currentUser && nextProps.data.currentUser) {
      this.props.load(nextProps.data.currentUser)
    }
  }

  render () {
    const { children, data: { loading, currentUser }  } = this.props

    return (
      <div className='current-user-container'>
        {loading && !currentUser ? <Loading /> : (
          React.cloneElement(children, { currentUser })
        )}
      </div>
    )
  }
}

export default graphql(fetchCurrentUser)(
  connect(undefined, { load })(CurrentUserContainer)
)
