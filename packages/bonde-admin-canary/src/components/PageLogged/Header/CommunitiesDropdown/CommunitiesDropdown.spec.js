import React from 'react'
import { shallow } from 'enzyme'
import { Dropdown, DropdownItem } from 'bonde-styleguide'
import { Link } from 'react-router-dom'
import urljoin from 'url-join'
import CommunitiesDropdown from './CommunitiesDropdown'

test.beforeEach(t => {
  const props = {
    t: (key) => key,
    path: '/communities'
  }
  t.context.node = shallow(<CommunitiesDropdown {...props} />)
})

test('render a Dropdown component', t => {
  const { node } = t.context

  t.is(node.find(Dropdown).length, 1)
})

test('translate label for communities', t => {
  const i18nKey = 'dropdown.label.communities'
  const i18n = () => i18nKey
  const { node } = t.context
  node.setProps({ t: i18n })

  t.is(node.find(Dropdown).props().label, i18nKey)
})

test('when data is empty render disabled', t => {
  const { node } = t.context

  t.is(node.find(Dropdown).props().disabled, true)
})

test('render DropdownItem when data is passed', t => {
  const { node } = t.context
  const communities = [
    { id: 1, name: 'C1' },
    { id: 2, name: 'C2' }
  ]
  node.setProps({ communities })

  t.is(node.find(DropdownItem).length, communities.length)
  t.is(node.find(DropdownItem).at(0).props().children, 'C1')
  t.is(node.find(DropdownItem).at(1).props().children, 'C2')
})

test('render DropdownItem with Link router', t => {
  const { node } = t.context
  const communities = [{ id: 1, name: 'C1' }]
  node.setProps({ communities })
  t.is(node.find(DropdownItem).props().component, Link)
})

test('mount path to redirect with id when pass path', t => {
  const { node } = t.context
  const communities = [{ id: 1, name: 'C1' }]
  const path = '/admin/communities/'
  node.setProps({ communities, path })
  t.is(node.find(DropdownItem).props().to, urljoin(path, communities[0].id.toString()))
})
