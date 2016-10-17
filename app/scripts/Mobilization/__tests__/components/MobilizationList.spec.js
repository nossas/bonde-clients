import React from 'react'
import { expect } from 'chai'
import { shallow } from 'enzyme'

import MobilizationList from '../../components/MobilizationList'

describe('app/scripts/Mobilization/components/MobilizationList', () => {
  let wrapper
  const context = { router: {} }
  const props = {
    mobilizations: [{ id: 1 }],
    redirectToEdit: () => {}
  }

  before(() => {
    wrapper = shallow(<MobilizationList {...props} />, { context })
  })

  describe('#render', () => {
    it('should render one div.mobilization-list', () => {
      expect(wrapper.find('div.mobilization-list')).to.have.length(1)
    })

    describe('component MobilizationListItemsHeader', () => {
      it('should render one MobilizationListItemsHeader component', () => {
        expect(wrapper.find('MobilizationListItemsHeader')).to.have.length(1)
      })
    })
  })
})
