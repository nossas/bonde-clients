import React from 'react'
import { shallow } from 'enzyme'
import { expect } from 'chai'

import TemplateChooseGlobalPage from '~routes/application/templates-choose-global/page'

describe('routes/application/templates-choose-global/page', () => {
  let wrapper
  const props = {
    mobilization: { id: 1 },
    createMobilizationFromTemplate: () => {}
  }

  beforeAll(() => {
    wrapper = shallow(<TemplateChooseGlobalPage {...props} />)
  })

  describe('#render', () => {
    it('should render without crash', () => {
      expect(wrapper).to.be.ok
    })
  })
})
