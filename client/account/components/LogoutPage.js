import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { connect } from 'react-redux'

import { logout } from '../actions'
import { Loading } from '../../Dashboard/components'

class LogoutPage extends Component {

  componentDidMount () {
    this.props.logout()
  }

  render () {
    return <Loading />
  }
}

LogoutPage.propTypes = {
  // Injected by react-redux
  logout: PropTypes.func.isRequired
}

const mapActionsToProps = { logout }

export default connect(null, mapActionsToProps)(LogoutPage)
