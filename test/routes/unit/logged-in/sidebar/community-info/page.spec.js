import React from 'react'
import { shallow } from 'enzyme'

import * as mock from '~utils/mock'
import Page from '~routes/logged-in/sidebar/community-info/page'

describe('routes/application/community-info/page', () => {
  const props = {
    fields: {
      image: {},
      name: {},
      city: {},
      description: {}
    },
    location: {},
    community: {},
    // Actions
    downloadActivists: mock.noop
  }

  it('should render without crashed', () => {
    shallow(<Page {...props} />)
  })
})
