import React from 'react'
import { shallow } from 'enzyme'
import { Dropdown, DropdownHeader, DropdownItem, Icon } from 'bonde-styleguide'
import { Link } from 'react-router-dom'
import UserDropdown from './UserDropdown'

const user = { firstName: 'Test', lastName: 'Dummy' }
const name = `${user.firstName} ${user.lastName}`

test.beforeEach(t => {
  const props = { user, t: () => {} }
  t.context.node = shallow(<UserDropdown {...props} />)
})

test('render a Dropdown component', t => {
  const { node } = t.context
  
  t.is(node.find(Dropdown).length, 1)
})

test('pass user name like label dropdown', t => {
  const { node } = t.context

  t.is(node.find(Dropdown).props().label, name)
})

test('render avatar in dropdown header', t => {
  const { node } = t.context
  const avatar = 'http://avatar.png'
  node.setProps({ user: { ...user, avatar } })

  t.is(node.find(DropdownHeader).find('img').props().src, avatar)
  t.is(node.find(DropdownHeader).find('span').text(), name)
})

/*
test('render a profile menu', t => {
  const { node } = t.context
  const i18nKey = 'dropdown.items.profile'
  const i18n = () => i18nKey
  node.setProps({ t: i18n })

  const item = node.find(DropdownItem).at(0)
  t.is(item.find(Icon).props().name, 'user')
  t.is(item.props().children[1], i18nKey)
  t.is(item.props().component, Link)
  t.is(item.props().to, '/admin/profile')
})
*/

test('render a logout menu', t => {
  const { node } = t.context
  const i18nKey = 'dropdown.items.logout'
  const i18n = () => i18nKey
  const logout = () => 'logout'
  node.setProps({ t: i18n, logout })

  const item = node.find(DropdownItem).at(0)
  t.is(item.find(Icon).props().name, 'times')
  t.is(item.props().children[1], i18nKey)
  t.is(item.props().onClick(), 'logout')
})
