import React from 'react'
import { connect } from 'react-redux'
import PubSub from 'pubsub-js'
import $ from 'jquery'
import {isLoaded as isAuthLoaded, load as loadAuth, logout} from './../reducers/auth'

import '../../styles/main.scss'
import '../../../node_modules/font-awesome/scss/font-awesome.scss'

export default class Application extends React.Component {
  render() {
    return(
      <div>
        {this.props.children && React.cloneElement(this.props.children)}
      </div>
    )
  }

  static fetchData(store) {
    const promises = [];
    if (!isAuthLoaded(store.getState())) {
      promises.push(store.dispatch(loadAuth()));
    }
    return Promise.all(promises);
  }
}
