import React from 'react'
import { expect } from 'chai'
import { shallow } from 'enzyme'
import FontSize from './FontSize.jsx'

describe('FontSize', () => {
  let wrapper

  beforeEach(() => {
    wrapper = shallow(<FontSize />)
  })

  describe('#render', () => {
    it('should render 1 div `.font-size`', () => {
      expect(wrapper.find('.font-size').length).to.equal(1)
    })
    it('should render 1 `svg`', () => {
      expect(wrapper.find('.font-size svg').length).to.equal(1)
    })
    it('should render 4 `rect`', () => {
      expect(wrapper.find('.font-size svg rect').length).to.equal(4)
    })
  })
})
