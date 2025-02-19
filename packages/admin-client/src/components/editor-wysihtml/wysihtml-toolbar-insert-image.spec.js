/* eslint-disable no-unused-expressions */
import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';

import { WYSIHTMLToolbarInsertImage } from '../../components/editor-wysihtml';

describe('client/components/editor-wysihtml/wysihtml-toolbar-insert-image', () => {
  let wrapper;
  const props = {
    dispatch: () => {},
  };

  beforeEach(() => {
    wrapper = shallow(<WYSIHTMLToolbarInsertImage {...props} />);
  });

  describe('#render', () => {
    it('should render without crash', () => {
      expect(wrapper).to.be.ok;
    });
  });
});
