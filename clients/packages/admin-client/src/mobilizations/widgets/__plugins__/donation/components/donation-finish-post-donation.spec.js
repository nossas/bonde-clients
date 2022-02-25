import React from 'react';
import { shallow } from 'enzyme';

import { DonationFinishPostDonation } from '../../../../../mobilizations/widgets/__plugins__/donation/components';

describe('client/mobilizations/widgets/__plugins__/donation/components/donation-finish-post-donation', () => {
  let wrapper;
  const props = {
    mobilization: {},
  };

  beforeEach(() => {
    wrapper = shallow(<DonationFinishPostDonation {...props} />);
  });

  describe('#render', () => {
    it('should render without crash', () => {
      expect(wrapper).toBeTruthy();
    });
  });
});
