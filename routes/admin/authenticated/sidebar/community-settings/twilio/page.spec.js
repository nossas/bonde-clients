import React from 'react'
import { shallowWithIntl } from '~root/intl/helpers'
import * as mock from '~client/utils/mock'
import Page from '~routes/admin/authenticated/sidebar/community-settings/mailchimp/page'

describe('routes/admin/authenticated/sidebar/community-settings/mailchimp/page', () => {
  const props = {
    fields: {
      twilio_account_sid: {},
      twilio_auth_token: {},
      twilio_number: {}
    },
    location: {},
    // redux-form required props
    submit: mock.noop
  }

  it('should render without crashed', () => {
    shallowWithIntl(<Page {...props} />)
  })
})
