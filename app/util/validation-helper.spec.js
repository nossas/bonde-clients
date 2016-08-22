import { expect } from 'chai'

import * as validator from './validation-helper'


describe('validation-helper', () => {

  context('isValidEmail(email[:string:required])', () => {

    it('should validate is false e-mail name@provedor.com@', () => {
      expect(validator.isValidEmail('name@provedor.com@')).to.equal(false)
    })
  })
})
