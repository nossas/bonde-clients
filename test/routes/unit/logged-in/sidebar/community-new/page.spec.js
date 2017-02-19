import React from 'react'
import { shallow } from 'enzyme'

import * as mock from '~utils/mock'
import Page from '~routes/logged-in/sidebar/community-new/page'

describe('routes/application/community-new/page', () => {
  const props = {
    fields: {
      name: {},
      city: {}
    },
    submitting: false,
    // Actions
    create: mock.noop
  }

  it('should render without crashed', () => {
    shallow(<Page {...props} />)
  })
})
