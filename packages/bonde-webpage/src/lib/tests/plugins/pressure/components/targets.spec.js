/* eslint-disable no-unused-expressions */
import React from 'react'
import { expect } from 'chai'
import { shallow } from 'enzyme'
import { Targets } from '@bonde-webpage/plugins/pressure/components'

describe('@bonde-webpage/plugins/pressure/components Targets', () => {
  let wrapper

  beforeEach(() => {
    wrapper = shallow(<Targets onSelect={(item) => item} />)
  })

  it('should render ok by default', () => {
    expect(wrapper).to.be.ok
    expect(wrapper.find('.target-item').length).to.equal(0)
  })

  describe('email pressure', () => {
    it('should render .target-item according targets passed', () => {
      // jump the targets shuffle process
      wrapper.setState({ targets: ['Igor Santos <igor@nossascidades.org>'] })
      expect(wrapper.find('.target-item').length).to.equal(1)
    })

    it('should render target parsed to Name <user@host.com>', () => {
      const targets = ['Igor Santos <igor@nossascidades.org>']
      // jump the targets shuffle process
      wrapper.setState({ targets })

      expect(wrapper.find('.target-item span').at(0).text()).to.equal('Igor Santos')
      expect(wrapper.find('.target-item span').at(1).text()).to.equal('igor@nossascidades.org')
    })
  })
})
