import React from 'react'
/*import { createStore } from 'redux'*/

/*import sinon from 'sinon'*/
import { expect } from 'chai'
import { shallow } from 'enzyme'

import Widget from './Widget.jsx'


describe('Widget', () => {
  let widgetOptions = [
    { 'widget': { kind: 'draft' }, 'component': 'DraftWidget' },
    { 'widget': { kind: 'content' }, 'component': 'ContentWidget' },
    { 'widget': { kind: 'form' }, 'component': 'FormWidget' },
    { 'widget': { kind: 'donation' }, 'component': 'DonationWidget' },
  ]
  let defaultProps = {
    auth: {},
    mobilization: {},
    editable: false,
    dispatch: () => {},
    onEdit: () => {},
    onCancelEdit: () => {},
  }

  it('should render component according to props.widget.kind', () => {
    widgetOptions.map((item) => {
      let props = {
        widget: item.widget,
        ...defaultProps
      }
      let wrapper = shallow(<Widget {...props} />)
      console.log(item)
      expect(wrapper.find(item.component).length).to.equal(1)
    })
  })

  it('should render DraftWidget by default', () => {
    let props = {
      widget: {},
      ...defaultProps
    }
    let wrapper = shallow(<Widget {...props} />)
    expect(wrapper.find('DraftWidget').length).to.equal(1)
  })

  it('should mount className according to size props.widget', () => {
    let props = {
      widget: { sm_size: '2', md_size: '4', lg_size: '4' },
      ...defaultProps
    }
    let wrapper = shallow(<Widget {...props} />)
    let divProps = wrapper.find('div').at(0).props()

    expect(divProps.className).to.match(/(sm\-col\-2)/)
    expect(divProps.className).to.match(/(md\-col\-4)/)
    expect(divProps.className).to.match(/(lg\-col\-4)/)
  })

  it('should mount className with col-{} equals props.widget.sm_size', () => {
    let props = {
      widget: { sm_size: '2' },
      ...defaultProps
    }
    let wrapper = shallow(<Widget {...props} />)
    let divProps = wrapper.find('div').at(0).props()

    expect(divProps.className).to.match(/(col\-2)/)
  })

  it('should pass props to child', () => {
    let props = {
      widget: {},
      test: 'abc',
      ...defaultProps
    }
    let wrapper = shallow(<Widget {...props} />)
    let child = wrapper.find('DraftWidget').at(0)
    expect(child.props().test).to.equal('abc')
  })

  it('should pass props.widget to child', () => {
    let props = {
      widget: { kind: 'content' },
      test: 'abc',
      ...defaultProps
    }
    let wrapper = shallow(<Widget {...props} />)
    let child = wrapper.find('ContentWidget').at(0)
    expect(child.props().widget).to.equal(props.widget)
  })
})
