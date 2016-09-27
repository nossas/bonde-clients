import React from 'react'

import { expect } from 'chai'
import { mount } from 'enzyme'

import BlockContainer from '../../containers/BlockContainer'


describe('<BlockContainer />', () => {
  let props = {
    block: {
      id: 1,
      bg_class: 'bg-1'
    },
    editable: true,
    mobilization: { header_font: 'Bar' }
  }
  let blockContainer

  beforeEach(() => {
    blockContainer = mount(<BlockContainer {...props} />)
  })

  it('should render <Widget /> agree widgets received', () => {
    const widgets = [
      {
        id: 1,
        kind: 'draft',
        sm_size: '12',
        md_size: '6',
        lg_size: '6'
      }
    ]
    blockContainer.setProps({ widgets: widgets })

    expect(blockContainer.find('DraftWidget').length).to.equal(1)
  })

  it('should not render <DropDownMenu /> if editable is false', () => {
    blockContainer.setProps({ editable: false })
    expect(blockContainer.find('DropDownMenu').length).to.equal(0)
  })

  it('should hide <DropDownMenu />  by default', () => {
    const dropDownMenu = blockContainer.find('DropDownMenu')
    expect(dropDownMenu.props().wrapperClassName).to.contain('display-none')
  })

  it('should show DropDownMenu when state.displayMenu is true', () => {
    blockContainer.setState({displayMenu: true})
    const dropDownMenu = blockContainer.find('DropDownMenu')
    expect(dropDownMenu.props().wrapperClassName).to.not.contain('display-none')
  })
})
