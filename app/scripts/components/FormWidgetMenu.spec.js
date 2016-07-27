import React from 'react'
import sinon from 'sinon'
import { expect } from 'chai'
import { render, mount, shallow } from 'enzyme'

import FormWidgetMenu from './FormWidgetMenu'
import * as Paths from '../Paths'

describe('FormWidgetMenu', () => {

  let props = {
    mobilization: {},
    widget: {},
    location: {}
  }

  it('should render 4 <TabMenuItem /> in childrens', () => {
    let wrapper = shallow(<FormWidgetMenu {...props} />)
    let node = wrapper.find('ul').at(0)
    expect(node.find('TabMenuItem')).to.have.length(4)
  })

  context('when active menu with pathname equals location', () => {
    let dummyId = 1
    props.mobilization.id = dummyId
    props.widget.id = dummyId

    it('should active tab Campos do formulário (fields settings)', () => {
      props.location.pathname = Paths.fieldsMobilizationWidget(dummyId, dummyId)

      let wrapper = shallow(<FormWidgetMenu {...props} />)
      let node = wrapper.find('ul TabMenuItem').at(0)
      expect(node.props().isActive).to.equals(true)
    })

    it('should active tab Ajustes (form settings)', () => {
      props.location.pathname = Paths.formMobilizationWidget(dummyId, dummyId)

      let wrapper = shallow(<FormWidgetMenu {...props} />)
      let node = wrapper.find('ul TabMenuItem').at(1)
      expect(node.props().isActive).to.equals(true)
    })

    it('should active tab Mensagem agradecimento (autofire)', () => {
      props.location.pathname = Paths.autofireMobilizationWidget(dummyId, dummyId)

      let wrapper = shallow(<FormWidgetMenu {...props} />)
      let node = wrapper.find('ul TabMenuItem').at(2)
      expect(node.props().isActive).to.equals(true)
    })
  })
})
