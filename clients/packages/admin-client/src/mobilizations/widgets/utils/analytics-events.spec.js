/**
 * @jest-environment jsdom
 */
import AnalyticsEvents from '../../../mobilizations/widgets/utils/analytics-events';

describe.skip('client/mobilizations/widgets/utils/analytics-events', () => {
  jest.spyOn(AnalyticsEvents, 'sendEvent');

  it('should return true when form is filled', () => {
    const result = AnalyticsEvents.formIsFilled();
    
    expect(result).toEqual(true);
    expect(AnalyticsEvents.sendEvent.calls.length).toEqual(1);
  });

  // formSavedData,
  // formSocialShare,
  // donationSetValue,
  // donationFinishRequest,
  // donationSocialShare,
  // pressureIsFilled,
  // pressureSavedData,
  // pressureSocialShare
});
