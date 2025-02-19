import React from 'react'
import { shallow } from 'enzyme'
import { Container } from 'bonde-components/chakra';
import { SettingsPageContentLayout } from '../../components/layout';

describe('client/components/layout/settings-page-content-layout', () => {
  let wrapper

  beforeEach(() => {
    wrapper = shallow(
      <SettingsPageContentLayout />
    );
  });

  it('should render with Container with custom styles', () => {
    expect(wrapper.find(Container).props())
      .toEqual({
        flex: 1,
        bg: 'gray.50',
        overflowY: 'auto'
      });
  });

  describe('#render', () => {
    beforeEach(() => {
      wrapper = shallow(
        <SettingsPageContentLayout>
          <h1>Foo Bar Hello World Heading!</h1>
        </SettingsPageContentLayout>
      );
    });

    it('should render one root .settings-page-content-layout <div> element', () => {
      expect(wrapper.find(Container).length).toEqual(1);
    });

    describe('children', () => {
      it('should render one <h1> element', () => {
        expect(wrapper.find('h1').length).toEqual(1);
      });

      it('should render one <h1> element with its content properly', () => {
        const expectedText = 'Foo Bar Hello World Heading!';
        expect(wrapper.find('h1').props().children).toEqual(expectedText);
      });
    });
  });
});
