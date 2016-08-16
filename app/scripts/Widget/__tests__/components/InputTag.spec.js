import React from 'react'
import { expect } from 'chai'
import { mount } from 'enzyme'

import { InputTag } from '../../components'


describe('<InputTag />', () => {
  let wrapper
  const re = /[\w ]+<(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))>/
  const tags = ['Tag 1', 'Tag 2']
  const props = {
    values: tags,
    onInsertTag: value => {
      wrapper.setProps({ values: [...tags, value] })
    },
    onRemoveTag: value => {
      wrapper.setProps({ values: tags.filter(tag => tag !== value) })
    },
    validate: value => {
      const errors = { valid: true }
      if (!value.match(re)) {
        errors.valid = false
        errors.message = 'Dismatch error'
      }
      return errors
    }
  }

  beforeEach(() => {
    wrapper = mount(<InputTag {...props} />)
  })

  it('should render error when keyUp Enter and validade return is false', () => {
    // simulate click with input empty
    wrapper.find('input').simulate('keyUp', { key: 'Enter' })

    expect(wrapper.find('span.red').text()).to.equal('Dismatch error')
  })

  it('should clean and call onInsertTag when keyUp Enter and validade return is true', () => {
    // simulate click with fill input
    wrapper.setState({ value: 'Igor Santos <igor@nossascidades.org>' })
    wrapper.find('input').simulate('keyUp', { key: 'Enter' })

    expect(wrapper.props().values).to.deep.equal(['Tag 1', 'Tag 2', 'Igor Santos <igor@nossascidades.org>'])
    expect(wrapper.instance().state.value).to.equal('')
  })

  it('should insert value in input and onRemoveTag when clicked to edit tag', () => {
    // find first tag: "Tag 1"
    const firstTag = wrapper.find('BlockTag').find('Tag').at(0)
    firstTag.find('span').at(1).simulate('click')
    expect(wrapper.instance().state.value).to.equal('Tag 1')
    expect(wrapper.props().values).to.deep.equal(['Tag 2'])
  })
})
