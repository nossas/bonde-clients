import React from 'react'
import { shallow } from 'enzyme'

import Page from '~routes/logged-in/sidebar/mobilizations-edit/page'

describe('routes/application/mobilizations-edit/page', () => {
  const defaultProps = { mobilization: {} }
  const context = { router: {} }

  it('should render without crashed', () => {
    shallow(<Page {...defaultProps} />, { context })
  })
})
