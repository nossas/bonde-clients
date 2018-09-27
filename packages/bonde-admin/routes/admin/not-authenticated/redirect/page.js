import React from 'react'
import { CrossStorageClient } from 'cross-storage'
import queryString from 'query-string'

class SignRedirect extends React.Component {
  constructor (props) {
    super(props)

    this.storage = new CrossStorageClient(
      process.env.CROSS_STORAGE_URL || 'http://localhost:8888'
    )
    this.state = { auth: undefined, loading: false }
  }

  componentDidMount () {
    this.setState({ loading: true })
    // Get user on cross-storage
    this.storage.onConnect()
      .then(() => this.storage.get('auth'))
      .then(userJson => {
        const auth = JSON.parse(userJson)
        // Set on localStorage to keep normal flux
        window.localStorage.setItem('auth', JSON.stringify({
          credentials: { 'access-token': auth.jwtToken }
        }))
        // Redirect for path after logged on app
        window.location.href = this.getRedirectPath()

        this.setState({ auth, loading: false })
      })
  }

  getRedirectPath () {
    const query = queryString.parse(this.props.location.search)
    return query.path
  }

  render () {
    const { auth, loading } = this.state
    return (
      <React.Fragment>
        <h1>Sign Redirect</h1>
        {loading && (<p>Checking your credentials...</p>)}
        {auth && (
          <div>
            <p>Redirect to: {this.getRedirectPath()}</p>
            <p>Your token: {auth.jwtToken}</p>
          </div>
        )}
      </React.Fragment>
    )
  }
}

export default SignRedirect
