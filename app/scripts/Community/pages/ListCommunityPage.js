import React, { Component } from 'react'
import { connect } from 'react-redux'
import { decorate } from 'react-mixin'
import { Navigation } from 'react-router'
import { fetch } from '../actions'


@decorate(Navigation)
class ListCommunityPage extends Component {

  componentDidMount() {
    const { isLoaded, fetch } = this.props
    if (!isLoaded) fetch()
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.isLoaded && nextProps.data.length === 0) {
      this.transitionTo('/community/new')
    }
  }

  render() {

    const { loading, isLoaded, data } = this.props

    return (
      <div>
        <h2>{loading ? 'Fetching...' : 'Community List'}</h2>
        {isLoaded ? (
          <ul>
            {data.map(c => <li>{c.name}</li>)}
          </ul>
        ) : <span>Can't loaded.</span>}
      </div>
    )
  }
}

const mapStateToProps = state => ({
  loading: state.community.loading,
  isLoaded: state.community.isLoaded,
  data: state.community.data,
  credentials: state.auth.credentials
})

const mapDispatchToProps = { fetch }

const mergeProps = (stateProps, dispatchProps, ownProps) => ({
  ...ownProps,
  ...stateProps,
  fetch: () => dispatchProps.fetch(stateProps.credentials)
})

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(ListCommunityPage)
