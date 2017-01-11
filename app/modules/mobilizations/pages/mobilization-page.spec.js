import React from 'react'
import { shallow } from 'enzyme'

import { MobilizationPage } from '../../pages/mobilization-page'

describe('app/modules/mobilizations/__tests__/pages/mobilization-page', () => {
  const defaultProps = { mobilization: {} }
  const context = { router: {} }

  it('should render without crashed', () => {
    shallow(<MobilizationPage {...defaultProps} />, { context })
  })
})
