import React from 'react'
import { connect } from 'react-redux'
import { Navigation } from 'react-router'
import reactMixin from 'react-mixin'

import { TopMenu, Loading } from './../components'
import * as Paths from '../Paths'
import * as AuthActions from './../actions/AuthActions'

@connect(state => ({ auth: state.auth }))
@reactMixin.decorate(Navigation)

export default class Logout extends React.Component {
  componentDidMount() {
    this.props.dispatch(AuthActions.logout())
      .fail((state) => this.setState({ auth: state }))
      .always(() => this.transitionTo(Paths.login()))
  }

  render() {
    return (
      <Loading />
    )
  }
}
