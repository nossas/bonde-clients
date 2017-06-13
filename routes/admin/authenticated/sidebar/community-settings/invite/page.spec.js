import React from 'react'
import { shallow } from 'enzyme'

import * as mock from '~client/utils/mock'
import Page from '~routes/admin/authenticated/sidebar/community-settings/invite/page'

describe('routes/admin/authenticated/sidebar/community-settings/invite/page', () => {
  const props = {
    fields: { email: {} }
  }

  it('should render without crashed', () => {
    shallow(<Page {...props} />)
  })
})
