import sinon from 'sinon'
import { expect } from 'chai'
import { FormAnalytics } from '@mobs/plugins/form'

describe('@mobs/plugins/form FormAnalytics', () => {
  let sandbox

  beforeEach(() => {
    sandbox = sinon.sandbox.create()
    sandbox.spy(FormAnalytics, 'sendEvent')
  })

  it('should called sendEvent when form is filled ', () => {
    FormAnalytics.formIsFilled()
    expect(FormAnalytics.sendEvent.called).to.be.true
  })

  // formSavedData,
  // formSocialShare,
  // donationSetValue,
  // donationFinishRequest,
  // donationSocialShare,
  // pressureIsFilled,
  // pressureSavedData,
  // pressureSocialShare
})
