import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { Navigation } from 'react-router'
import reactMixin from 'react-mixin'

import { logout } from './../reducers/auth'
import { Loading } from './../components'
import * as Paths from '../Paths'

@connect(state => ({ auth: state.auth }))
@reactMixin.decorate(Navigation)

export default class Logout extends React.Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired
  }

  componentDidMount() {
    this.props.dispatch(logout())
      .then(() => this.transitionTo(Paths.login()))
  }

  render() {
    return (
      <Loading />
    )
  }
}
