/* eslint-disable no-unused-expressions */
import { expect } from 'chai'

import * as helper from '~client/utils/format-number-helper'

describe('client/utils/format-number-helper', () => {
  describe('currency', () => {
    it('should return a number in BRL currency format', () => {
      expect(helper.currency(1000)).to.be.equal('R$ 1.000,00')
    })
  })
  describe('number', () => {
    it('should return a number in brazilian number format', () => {
      expect(helper.number(1000)).to.be.equal('1.000')
    })
  })
})
