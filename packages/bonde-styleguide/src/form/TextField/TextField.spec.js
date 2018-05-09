import test from 'ava'
import React from 'react'
import { shallow } from 'enzyme'
import TextField from './TextField'

test('render ControlLabel component', t => {
  const node = shallow(<TextField label='Default' />)
  t.is(node.find('ControlLabel').length, 1)
})

test('render ControlLabel with exact text passed by label prop', t => {
  const label = 'Default'
  const node = shallow(<TextField label={label} />)
  t.is(node.find('ControlLabel').children().text(), label)
})

test('not render InputHint by default', t => {
  const node = shallow(<TextField label='Default' />)
  t.is(node.find('InputHint').length, 0)
})

test('render InputHint when pass `hint` prop', t => {
  const node = shallow(<TextField label='Default' hint='Info/Hint' />)
  t.is(node.find('InputHint').length, 1)
})

test('render InputHint when pass `error` prop', t => {
  const node = shallow(<TextField label='Default' error='Validation Error' />)
  t.is(node.find('InputHint').length, 1)
})

test('render InputHint with `error` text when pass bot `error` and `hint` prop', t => {
  const error = 'Validation Error'
  const node = shallow(
    <TextField
      label='Default'
      hint='Info/Hint'
      error={error}
    />
  )
  t.is(node.find('InputHint').children().text(), error)
})

test('render InputHint with `hint` text when pass `hint` prop', t => {
  const hint = 'Info/Hint'
  const node = shallow(<TextField label='Default' hint={hint} />)
  t.is(node.find('InputHint').children().text(), hint)
})

test('render Input component properly', t => {
  const node = shallow(<TextField label='Default' />)
  t.is(node.find('Input').length, 1)
})

test('not render InputAdornment by default', t => {
  const node = shallow(<TextField label='Default' />)
  t.is(node.find('InputAdornment').length, 0)
})

test('render InputAdornment when `valid` prop was passed', t => {
  const node = shallow(<TextField label='Default' valid />)
  t.is(node.find('InputAdornment').length, 1)
})

test('render InputAdornment when `error` prop was passed', t => {
  const node = shallow(<TextField label='Default' error='Validatio Error' />)
  t.is(node.find('InputAdornment').length, 1)
})
