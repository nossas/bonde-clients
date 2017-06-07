import PropTypes from 'prop-types'
import React from 'react'
import ga from 'react-ga'
import DevTools from '~client/components/dev-tools'
import { ZendeskWidget } from '~client/components/external-services'
import NotificationSystem from '~client/components/notification-system'

import { GoogleFontsLoader } from '~client/components/fonts'

class Application extends React.Component {

  componentDidMount () {
    ga.initialize('UA-26278513-30')
  }

  componentDidUpdate (prevProps) {
    if (this.props.location.pathname !== prevProps.location.pathname) {
      ga.pageview(this.props.location.pathname)
    }
  }

  render () {
    const { children } = this.props
    return (
      <div>
        <ZendeskWidget />
        {process.env.NODE_ENV === 'development' ? <DevTools /> : ''}
        {children}
        <NotificationSystem />
        <GoogleFontsLoader fonts='Source Sans Pro' />
      </div>
    )
  }
}

Application.propTypes = {
  children: PropTypes.object.isRequired,
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired
  })
}

export default (Application)
