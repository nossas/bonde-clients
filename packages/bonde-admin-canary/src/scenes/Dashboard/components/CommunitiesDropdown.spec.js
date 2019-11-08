import React from 'react'
import { shallow } from 'enzyme'
import { expect } from 'chai'
import { Dropdown, DropdownItem } from 'bonde-styleguide'
import CommunitiesDropdown from './CommunitiesDropdown'

describe('components > PageLogged > Header > CommunitiesDropdown > CommunitiesDropdown', () => {
  let node

  beforeEach(() => {
    const props = {
      onChange: (c) => c
    }
    node = shallow(<CommunitiesDropdown {...props} />)
  })

  it('render a Dropdown component', () => {
    expect(node.find(Dropdown).length).to.be.equal(1)
  })

  it('called onChange when click on DropdownItem', () => {
    const communities = [{ id: 1, name: 'C1' }]
    node.setProps({ communities })
    expect(node.find(DropdownItem).props().onClick()).to.be.equal(communities[0])
  })
})
