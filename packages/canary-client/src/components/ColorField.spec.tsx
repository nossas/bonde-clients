import React from 'react';
import { shallow } from 'enzyme';
import { SketchPicker } from 'react-color';

jest.mock('bonde-components/form', () => ({
  useField: (name: string) => ({
    input: {}
  })
}))

import ColorField from './ColorField';

describe("ColorField tests", () => {
  const properties = {
    name: 'color',
    label: 'Lorem ipsum'
  }

  it('should be renders ok', () => {
    const wrapper = shallow(<ColorField {...properties} />);

    expect(wrapper).toBeTruthy();
  });

  it('should render SketchPicker', () => {
    const wrapper = shallow(<ColorField {...properties} />);

    expect(wrapper.find(SketchPicker).length).toEqual(1);
  });
})