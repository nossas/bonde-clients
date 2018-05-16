import test from 'ava'
import React from 'react'
import { shallow } from 'enzyme'
import Pagination from './Pagination'

const { defaultProps } = Pagination

const excludePrevAndNextButtons = 2

test('render first and last icon buttons', t => {
  const node = shallow(<Pagination />)
  t.is(node.find('IconButton').length, 2)
})

test('render 3 flat buttons by default', t => {
  const node = shallow(<Pagination />)
  t.is(node.find('FlatButton').length, 3)
})

test(`first icon button name should be ${defaultProps.iconFirst} by default`, t => {
  const node = shallow(<Pagination />)
  t.is(node.find('IconButton').get(0).props.name, defaultProps.iconFirst)
})

test(`last icon button name should be ${defaultProps.iconLast} by default`, t => {
  const node = shallow(<Pagination />)
  t.is(node.find('IconButton').get(1).props.name, defaultProps.iconLast)
})

test('first icon button should be disabled by default', t => {
  const node = shallow(<Pagination />)
  t.is(node.find('IconButton').get(0).props.disabled, true)
})

test('last icon button should be disabled by default', t => {
  const node = shallow(<Pagination />)
  t.is(node.find('IconButton').get(1).props.disabled, true)
})

test('prev button should be disabled by default', t => {
  const node = shallow(<Pagination />)
  t.is(node.find('FlatButton').get(0).props.disabled, true)
})

test('next button should be disabled by default', t => {
  const node = shallow(<Pagination />)
  t.is(node.find('FlatButton').get(2).props.disabled, true)
})

test('render 1 item by default', t => {
  const node = shallow(<Pagination />)
  t.is(node.find('FlatButton').length - excludePrevAndNextButtons, 1)
})

test('render 10 items as passed via `pages` props properly', t => {
  const pages = 10
  const node = shallow(<Pagination pages={pages} />)
  t.is(node.find('FlatButton').length - excludePrevAndNextButtons, pages)
})

test('render only page index 0 with activeColor by default', t => {
  const pages = 5
  const node = shallow(<Pagination pages={pages} />)
  t.is(node.find('FlatButton').get(1).props.color, defaultProps.activeColor)
  t.is(node.find('FlatButton').get(2).props.color, '')
  t.is(node.find('FlatButton').get(3).props.color, '')
  t.is(node.find('FlatButton').get(4).props.color, '')
  t.is(node.find('FlatButton').get(5).props.color, '')
})

test('render only page index 2 with activeColor via `activeIndex` props properly', t => {
  const pages = 5
  const node = shallow(<Pagination pages={pages} activeIndex={2} />)
  t.is(node.find('FlatButton').get(1).props.color, '')
  t.is(node.find('FlatButton').get(2).props.color, '')
  t.is(node.find('FlatButton').get(3).props.color, defaultProps.activeColor)
  t.is(node.find('FlatButton').get(4).props.color, '')
  t.is(node.find('FlatButton').get(5).props.color, '')
})

test('disable next button and last icon button when last page index was reached', t => {
  const pages = 5
  const node = shallow(<Pagination pages={pages} />)
  node.find('FlatButton').at(6).simulate('click')
  node.find('FlatButton').at(6).simulate('click')
  node.find('FlatButton').at(6).simulate('click')
  node.find('FlatButton').at(6).simulate('click')
  t.is(node.find('FlatButton').get(6).props.disabled, true)
  t.is(node.find('IconButton').get(1).props.disabled, true)
})

test('disable next button and last icon button when last icon button was clicked', t => {
  const pages = 5
  const node = shallow(<Pagination pages={pages} />)
  node.find('IconButton').at(1).simulate('click')
  t.is(node.find('FlatButton').get(6).props.disabled, true)
  t.is(node.find('IconButton').get(1).props.disabled, true)
})

test('disable prev button and first icon button when first page index was reached', t => {
  const pages = 5
  const node = shallow(<Pagination pages={pages} activeIndex={4} />)
  node.find('FlatButton').at(0).simulate('click')
  node.find('FlatButton').at(0).simulate('click')
  node.find('FlatButton').at(0).simulate('click')
  node.find('FlatButton').at(0).simulate('click')
  t.is(node.find('FlatButton').get(0).props.disabled, true)
  t.is(node.find('FlatButton').get(6).props.disabled, false)
  t.is(node.find('IconButton').get(0).props.disabled, true)
  t.is(node.find('IconButton').get(1).props.disabled, false)
})

test('disable next button and last icon button when last icon button was clicked', t => {
  const pages = 5
  const node = shallow(<Pagination pages={pages} activeIndex={4} />)
  node.find('IconButton').at(0).simulate('click')
  t.is(node.find('FlatButton').get(0).props.disabled, true)
  t.is(node.find('FlatButton').get(6).props.disabled, false)
  t.is(node.find('IconButton').get(0).props.disabled, true)
  t.is(node.find('IconButton').get(1).props.disabled, false)
})
