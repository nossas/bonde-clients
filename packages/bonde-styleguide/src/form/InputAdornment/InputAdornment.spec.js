import test from 'ava'
import React from 'react'
import { mount } from 'enzyme'
import InputAdornment from './InputAdornment'

test('render an exclamation char when `invalid` is true', t => {
  const node = mount(<InputAdornment invalid />)
  t.is(node.text(), '!')
})

test('render blank when `valid` is true', t => {
  const node = mount(<InputAdornment valid />)
  t.is(node.text(), '')
})
