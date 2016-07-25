import React from 'react'

import { expect } from 'chai'
import { mount } from 'enzyme'

import DraftWidget from '../../src/DraftWidget'

import * as WidgetComponents from '../../src'


describe('<DraftWidget />', () => {
  // Remove draft to simulate render menu
  const componentes = Object.assign({}, WidgetComponents)
  delete componentes['draft']

  let props = {
    widget: {
      id: 1,
      kind: 'draft'
    }
  }
  let draft

  beforeEach(() => {
    draft = mount(<DraftWidget {...props} />)
  })

  it('should render menu with options of Widget/src', () => {
    expect(draft.find('button').length).to.equal(Object.keys(componentes).length)
  })

  it('should setWidget when click button', () => {
    const firstKind = Object.keys(componentes)[0]

    let clickedKind
    draft.setProps({
      setWidget: kind => clickedKind = kind
    })

    draft.find('button').at(0).simulate('click')

    expect(firstKind).to.equal(clickedKind)
  })
})
