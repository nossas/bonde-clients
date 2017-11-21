import { expect } from 'chai'

import { required, validateEmail, validate } from './'

describe('validate', () => {
  it('should return errors with required field', () => {
    const values = { firstName: 'Ada', email: '', lastName: '' }
    expect(required(['firstName', 'lastName', 'email'])(values)).to.deep.equal({
      lastName: 'Required field.',
      email: 'Required field.'
    })
  })

  it('should return errors with invalid email', () => {
    const values = {
      email: 'test@nossas.org',
      email1: '',
      email2: 'test@@nossas.org'
    }
    expect(validateEmail(['email', 'email1', 'email2'])(values)).to.deep.equal({
      email1: 'Email isn\'t valid.',
      email2: 'Email isn\'t valid.'
    })
  })

  it('should keep validation message with order to be applied', () => {
    const values = { name: '', email: '' }

    const fnFirstRequired = validate([
      required(['name', 'email']),
      validateEmail(['email'])
    ])
    expect(fnFirstRequired(values)).to.deep.equal({
      name: 'Required field.',
      email: 'Required field.'
    })

    const fnFirstEmail = validate([
      validateEmail(['email']),
      required(['name', 'email'])
    ])
    expect(fnFirstEmail(values)).to.deep.equal({
      name: 'Required field.',
      email: 'Email isn\'t valid.'
    })
  })
})
