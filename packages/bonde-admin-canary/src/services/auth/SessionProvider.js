import React from 'react'
import authSession from './session'
import { LoadingFullScreen } from 'components/Loadable'

/*
 * Responsible to control session used on cross-storage
 **/
class SessionProvider extends React.Component { 
  constructor (props) {
    super(props)
    this.state = { signing: true, authenticated: false }
  }

  componentDidMount () {
    authSession.getAsyncToken()
      .then(token => {
        if (token) {
          this.setState({ signing: false, authenticated: true })
          return Promise.resolve()
        }
        this.setState({ signing: false, authenticated: false })
      })
  }

  render () {
    return !this.state.signing
      ? this.props.children
      : <LoadingFullScreen message='Signing...' /> 
  }
}

export default SessionProvider
