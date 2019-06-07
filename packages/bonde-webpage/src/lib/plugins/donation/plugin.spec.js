import * as React from 'react'
import test from 'ava'
import { shallow } from 'enzyme'
import DonationPlugin, { DonationSubmitButton } from './plugin'

let plugin = undefined

test.beforeEach((t) => {
  t.context.props = {
    widget: { settings: {} },
    mobilization: {},
    intl: { formatMessage: (key) => `{${key}}` },
    handleDonationTransactionCreate: () => new Promise((resolve) => {
      return resolve()
    }),
    overrides: {
      FinishCustomMessage: { component: () => <div className='finish-custom-message'/> },
      FinishDefaultMessage: { component: () => <div className='finish-default-message'/> },
      FinishDonationMessage: { component: () => <div className='finish-donation-message'/> }
    }
  }
  t.context.plugin = shallow(<DonationPlugin {...t.context.props} />)
})

test('should be render DonationPlugin its ok', t => {
  const { plugin } = t.context

  t.true(plugin.hasClass('widget'))
})

test('change state to success when resolve handleDonationTransactionCreate', t => {
  const { plugin } = t.context
  plugin.find(DonationSubmitButton).simulate('click')
  
  setImmediate(() => {
    t.is(plugin.state('success'), true)
  })
})

test('render FinishDonationMessage.component when pos action is donation-recurrent', t => {
  const { plugin, props: { overrides: { FinishDonationMessage } } } = t.context
  // pos action is donation-recurrent
  const widget = { id: 1, settings: { finish_message_type: 'donation-recurrent' }}
  plugin.setProps({ widget })
  // simulate donation click button
  plugin.find(DonationSubmitButton).simulate('click')
  
  setImmediate(() => {
    t.is(plugin.find(FinishDonationMessage.component).length, 1)
  })
})

test('render FinishDefaultMessage.component when pos action is share', t => {
  const { plugin, props: { overrides: { FinishDefaultMessage } } } = t.context
  // pos action is share
  const widget = { id: 1, settings: { finish_message_type: 'share' }}
  plugin.setProps({ widget })
  // simulate donation click button
  plugin.find(DonationSubmitButton).simulate('click')
  
  setImmediate(() => {
    t.is(plugin.find(FinishDefaultMessage.component).length, 1)
  })
})

test('render FinishCustomMessage.component when pos action is custom', t => {
  const { plugin, props: { overrides: { FinishCustomMessage } } } = t.context
  // pos action is custom
  const widget = { id: 1, settings: { finish_message_type: 'custom' }}
  plugin.setProps({ widget })
  // simulate donation click button
  plugin.find(DonationSubmitButton).simulate('click')

  setImmediate(() => {
    t.is(plugin.find(FinishCustomMessage.component).length, 1)
  })
})