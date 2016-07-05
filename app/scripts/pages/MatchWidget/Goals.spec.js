import React from 'react'

import { mount } from 'enzyme'
import { expect } from 'chai'
import sinon from 'sinon'

import Goals from './Goals'


describe('Goals', () => {
  let wrapper
  let props = {
    params: { widget_id: '1' },
    mobilization: { id: 1 },
    widgets: { data: [{ id: 1, settings: {} }] },
    location: { pathname: '' }
  }

  const mockContext = {
    router: {
      makeHref: sinon.stub(),
      isActive: sinon.stub()
    }
  }

  before(() => {
    wrapper = mount(<Goals {...props} />, { context: mockContext })
  })

  it('should render ChoiceCombined itens equals possible match', () => {
    wrapper.setProps({
      widgets: { data: [{ id: 1, settings: {
        choices1: '1,2,3',
        choicesA: '4,5'
      } }]}
    })
    expect(wrapper.find('ChoiceCombined').length).to.equal(3*2)
  })
})
