import React from 'react'
import PropTypes from 'prop-types'
import qs from 'query-string'
import { FullPageLoading } from 'bonde-styleguide'
import authSession from './session'

/*
 * Responsible to control session used on cross-storage
 **/
class SessionProvider extends React.Component {
  constructor (props) {
    super(props)
    this.state = { signing: true, authenticated: false }
  }

  componentDidMount () {
    authSession
      .getAsyncToken()
      .then(token => {
        if (token) {
          // keep next params on session to use in redirect when invalid token
          const params = qs.parse(window.location.search)
          if (params.next) {
            authSession.setItem('redirectTo', params.next)
          }

          this.setState({ signing: false, authenticated: true })
          return Promise.resolve()
        }
        this.setState({ signing: false, authenticated: false })
      })
  }

  render () {
    return !this.state.signing
      ? this.props.children
      : <FullPageLoading />
  }
}

SessionProvider.propTypes = {
  children: PropTypes.node
}

export default SessionProvider
