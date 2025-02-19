/* eslint-disable no-unused-expressions */
import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';

import { WYSIHTMLToolbarColorPicker } from '../editor-wysihtml';

describe('client/components/editor-wysihtml/wysihtml-toolbar-color-picker', () => {
  let wrapper;
  const props = {
    dispatch: () => {},
  };

  beforeEach(() => {
    wrapper = shallow(<WYSIHTMLToolbarColorPicker {...props} />);
  });

  describe('#render', () => {
    it('should render without crash', () => {
      expect(wrapper).to.be.ok;
    });
  });
});
