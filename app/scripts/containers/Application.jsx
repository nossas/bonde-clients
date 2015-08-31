import React from 'react'
import { connect } from 'react-redux'
import PubSub from 'pubsub-js'
import $ from 'jquery'

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
}
