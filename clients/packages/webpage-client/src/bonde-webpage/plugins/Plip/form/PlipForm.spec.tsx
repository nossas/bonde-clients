import React from 'react';
import { shallow } from 'enzyme';
import { Form, Field } from 'bonde-components/form';
import PlipForm from './PlipForm';

describe('PlipForm tests', () => {
  const mockAsyncFillWidget = jest.fn();
  const mockWidget = {}


  it('should renders ok', () => {
    const wrapper = shallow(
      <PlipForm
        asyncFillWidget={mockAsyncFillWidget}
        widget={mockWidget}
      />
    );

    expect(wrapper).toBeTruthy();
  });

  describe('fields', () => {
    const wrapper = shallow(
      <PlipForm
        asyncFillWidget={mockAsyncFillWidget}
        widget={mockWidget}
      />
    ).find(Form).renderProp('children')({ handleSubmit: jest.fn() } as any);

    it('should render name field', () => {
      const field = wrapper.find(Field).at(0);

      expect(field.props().name).toEqual('name');
    });

    it('should render email field', () => {
      const field = wrapper.find(Field).at(1);

      expect(field.props().name).toEqual('email');
    });

    it('should render state field', () => {
      const field = wrapper.find(Field).at(2);

      expect(field.props().name).toEqual('state');
    });

    it('should render whatsapp field', () => {
      const field = wrapper.find(Field).at(3);

      expect(field.props().name).toEqual('whatsapp');
    });

    it('should render signature_quantity field', () => {
      const field = wrapper.find(Field).at(4);

      expect(field.props().name).toEqual('signature_quantity');
    });

    it('should render color field', () => {
      const field = wrapper.find(Field).at(5);

      expect(field.props().name).toEqual('color');
    });

    it('should render gender field', () => {
      const field = wrapper.find(Field).at(6);

      expect(field.props().name).toEqual('gender');
    });
  })

});