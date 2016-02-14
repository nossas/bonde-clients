import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import {isLoaded as isAuthLoaded, load as loadAuth} from './../reducers/auth'
import trackPageView from './../../../src/trackPageView'

import '../../styles/main.scss'
// import '../../../node_modules/font-awesome/scss/font-awesome.scss'

@connect(state => ({ auth: state.auth }))

export default class Application extends React.Component {
  static propTypes = {
    children: PropTypes.object.isRequired,
    auth: PropTypes.object,
    location: PropTypes.shape({
      pathname: PropTypes.string.isRequired
    })
  }

  static fetchData(store) {
    const promises = []
    if (!isAuthLoaded(store.getState())) {
      promises.push(store.dispatch(loadAuth()))
    }
    return Promise.all(promises)
  }

  componentDidUpdate(prevProps) {
    if (this.props.location.pathname !== prevProps.location.pathname) {
      trackPageView(this.props.location.pathname)
    }
  }

  render() {
    return (
      <div>
        {React.cloneElement(this.props.children, {auth: this.props.auth})}
      </div>
    )
  }
}
