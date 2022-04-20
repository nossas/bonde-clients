import React from 'react';
import { shallow } from 'enzyme';
import { Stack } from 'bonde-components/chakra';
import { SettingsPageMenuLayout } from '../../components/layout'

describe('client/components/layout/settings-page-menu-layout', () => {
  let wrapper;
  const props = { title: 'Foo Title' };
  
  beforeEach(() => {
    wrapper = shallow(<SettingsPageMenuLayout {...props} />);
  });
  
  it('should render one root .settings-page-menu-layout <div> element', () => {
    expect(wrapper.find(Stack).length).toEqual(1);
  });

  it('should render Stack with custom styles', () => {
    expect(wrapper.find(Stack).props())
      .toEqual({
        children: [
          <h1 className='h1 mt0 mb2'>{props.title}</h1>,
          undefined
        ],
        direction: "column",
        px: 6,
        paddingTop: 6
      });
  });

  describe('#render', () => {
    beforeEach(() => {
      wrapper = shallow(
        <SettingsPageMenuLayout {...props}>
          <h2>Foo Bar Hello World Heading!</h2>
        </SettingsPageMenuLayout>
      );
    });

    describe('title', () => {
      it('should render one <h1> element', () => {
        expect(wrapper.find('h1').length).toEqual(1);
      });

      it('should render one <h1> element with content as passed via title prop', () => {
        expect(wrapper.find('h1').text()).toEqual(props.title);
      });
    });

    describe('children', () => {
      it('should render one <h2> element', () => {
        expect(wrapper.find('h2').length).toEqual(1);
      });

      it('should render one <h2> element with its content properly', () => {
        const expectedText = 'Foo Bar Hello World Heading!';
        expect(wrapper.find('h2').text()).toEqual(expectedText);
      });
    });
  });
});
