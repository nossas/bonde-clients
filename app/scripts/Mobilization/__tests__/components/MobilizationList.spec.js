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

    describe('component MobilizationListItem', () => {
      let listItem
      beforeEach(() => {
        wrapper = shallow(<MobilizationList {...props} />, { context })
        listItem = wrapper.find('MobilizationListItem')
      })

      it('should render two MobilizationListItem component', () => {
        wrapper.setProps({ ...props, mobilizations: [{ id: 1 }, { id: 2 }] })
        expect(wrapper.find('MobilizationListItem')).to.have.length(2)
      })
      it('should render one MobilizationListItem component', () => {
        expect(listItem).to.have.length(1)
      })
      it('should render MobilizationListItem with mobilization prop properly', () => {
        expect(listItem.props().mobilization).to.be.deep.equal(props.mobilizations[0])
      })
      it('should render MobilizationListItem with redirectToEdit prop as a function', () => {
        expect(listItem.props().redirectToEdit).to.be.a.function
      })
    })
  })
})
