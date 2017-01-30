import sinon from 'sinon'
import { expect } from 'chai'

import AnalyticsEvents from '../../../modules/widgets/utils/analytics-events'

describe.skip('app/modules/widgets/utils/analytics-events', () => {
  let sandbox

  before(() => {
    sandbox = sinon.sandbox.create()
    sandbox.spy(AnalyticsEvents, 'sendEvent')
  })

  context('#formIsFilled', () => {
    console.log(AnalyticsEvents)
    it('should return true when form is filled', () => {
      expect(AnalyticsEvents.formIsFilled()).to.be.true
    })

    expect(AnalyticsEvents.sendEvent).to.be.called
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
