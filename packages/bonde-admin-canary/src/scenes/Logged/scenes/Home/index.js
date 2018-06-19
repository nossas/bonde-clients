import React from 'react'
import { I18n } from 'react-i18next'
import { tourtip } from 'components/Tourtip'
import { Auth } from 'services/auth'
import { withLastLocation } from 'services/router'
import Home from './Home'

const HomeCompose = (props) => (
  <I18n ns='home'>
    {(t) => (
      <Auth>
        {({ user }) => (
          <Home t={t} user={user} />
        )}
      </Auth>
    )}
  </I18n>
)

export default withLastLocation(
  tourtip({
    init: ({ lastLocation }) => lastLocation && lastLocation.pathname === '/admin/tags'
  })(HomeCompose)
)

