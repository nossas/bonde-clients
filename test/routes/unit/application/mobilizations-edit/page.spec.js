import React from 'react'
import { shallow } from 'enzyme'

import MobilizationPage from '~routes/application/mobilizations-edit/page'

describe('routes/application/mobilizations-edit/page', () => {
  const defaultProps = { mobilization: {} }
  const context = { router: {} }

  it('should render without crashed', () => {
    shallow(<MobilizationPage {...defaultProps} />, { context })
  })
})
