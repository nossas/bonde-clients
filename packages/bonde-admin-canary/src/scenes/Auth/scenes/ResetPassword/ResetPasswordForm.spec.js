import test from 'ava'
import React from 'react'
import { shallow } from 'enzyme'
import { Button, Title } from 'bonde-styleguide'
import { ButtonLink } from 'components/Link'
import { Form } from 'components/Form'
import { PasswordField } from '../components'
import ResetPasswordForm from './ResetPasswordForm'

test.beforeEach(t => {
  const i18n = key => key
  t.context.node = shallow(<ResetPasswordForm t={i18n} />)
})

// render
test('should render header labels', t => {
  const { node } = t.context
  const title = 'resetPassword.form.title'
  const subtitle = 'resetPassword.form.subtitle'
  
  t.is(node.find(Title.H2).props().children, title)
  t.is(node.find(Title.H4).props().children, subtitle)
})

test('should render a form component', t => {
  const { node } = t.context
  
  t.is(node.find(Form).length, 1)
})

test('should render a submit button', t => {
  const { node } = t.context
  const submitButtonProps = node.find(Button).props()
  
  t.is(submitButtonProps.type, 'submit')
  t.is(submitButtonProps.children, 'resetPassword.form.submit')
})

test('should render a button link to /auth/login', t => {
  const { node } = t.context
  const buttonLinkProps = node.find(ButtonLink).props()
  
  t.is(buttonLinkProps.children, 'resetPassword.form.cancel')
  t.is(buttonLinkProps.to, '/auth/login')
})

test('should render an input password', t => {
  const { node } = t.context
  const fieldProps = node.find('Field').props()
  
  t.is(fieldProps.name, 'password')
  t.is(fieldProps.label, 'resetPassword.fields.password.label')
  t.is(fieldProps.component, PasswordField)
})
