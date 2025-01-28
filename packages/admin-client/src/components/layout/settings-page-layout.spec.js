import React from 'react'
import { shallow } from 'enzyme'
import { Flex } from 'bonde-components/chakra';

import { SettingsPageLayout } from '../../components/layout'

describe('client/components/layout/settings-page-layout', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(
      <SettingsPageLayout />
    );
  });
  
  it('should render Flex with custom styles', () => {
    expect(wrapper.find(Flex).props())
      .toEqual({ flexDir: "column", width: "100%", height: '100vh' });
  });

  describe('#render', () => {
    
    beforeEach(() => {
      wrapper = shallow(
        <SettingsPageLayout>
          <h1>Foo Bar Hello World Heading!</h1>
        </SettingsPageLayout>
      );
    });

    it('should render one root Flex element', () => {
      expect(wrapper.find(Flex).length).toEqual(1);
    });
    
    it('should render one <h1> element', () => {
      expect(wrapper.find('h1').length).toEqual(1);
    });

    it('should render one <h1> element with its content properly', () => {
      const expectedText = 'Foo Bar Hello World Heading!';
      expect(wrapper.find('h1').props().children).toEqual(expectedText);
    });
  });
});
