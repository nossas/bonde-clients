import React from 'react'
import { shallow } from 'enzyme'
import { expect } from 'chai'

import { MobilizationListItem } from '../../components'

describe('app/scripts/Mobilization/components/MobilizationListItem', () => {
  let wrapper
  const context = { router: {} }
  const props = {
    mobilization: { id: 1, name: '', goal: '', created_at: '' }
  }

  before(() => {
    wrapper = shallow(<MobilizationListItem {...props} />, { context })
  })

  describe('#render', () => {
    it('should render one react-router Link component', () => {
      expect(wrapper.find('Link')).to.have.length(1)
    })
    it('should render one MobilizationListItemAvatar component', () => {
      expect(wrapper.find('MobilizationListItemAvatar')).to.have.length(1)
    })
    it('should render one MobilizationListItemMore component', () => {
      expect(wrapper.find('MobilizationListItemMore')).to.have.length(1)
    })

    describe('list item table container', () => {
      let container
      before(() => {
        container = wrapper.find('div.list-item-table-container')
      })

      it('should render one div.list-item-table-container', () => {
        expect(container).to.have.length(1)
      })
      it('should render one MobilizationListItemName component inside', () => {
        expect(container.find('MobilizationListItemName')).to.have.length(1)
      })
      it('should render one MobilizationListItemCreatedAt component inside', () => {
        expect(container.find('MobilizationListItemCreatedAt')).to.have.length(1)
      })
      it('should render one MobilizationListItemUsers component inside', () => {
        expect(container.find('MobilizationListItemUsers')).to.have.length(1)
      })
      it('should render one MobilizationListItemFundRaising component inside', () => {
        expect(container.find('MobilizationListItemFundRaising')).to.have.length(1)
      })
    })
  })
})
