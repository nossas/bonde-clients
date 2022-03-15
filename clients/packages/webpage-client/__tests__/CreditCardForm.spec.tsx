import React from 'react';
import { shallow } from 'enzyme';
import { Form } from 'bonde-components/form';

jest.mock('next/config', () => () => ({
  publicRuntimeConfig: {}
}))

const submitSpy = jest.fn();
jest.mock('../src/pages/subscriptions/_components/CreditCardForm/submit', () => submitSpy);

import CreditCardForm from '../src/pages/subscriptions/_components/CreditCardForm';

describe('CreditCardForm tests', () => {
  const properties = {
    id: 78,
    token: '1234jasdb-asdads2-asdat553'
  }

  beforeEach(() => {
    jest.resetAllMocks();
  })

  it('should be renders ok', () => {
    const wrapper = shallow(<CreditCardForm {...properties} />);

    expect(wrapper).toBeTruthy();
  })

  it('should call recharge on submit', () => {
    const wrapper = shallow(<CreditCardForm {...properties} />);
    wrapper.find(Form).simulate('submit')

    expect(submitSpy.mock.calls.length).toEqual(1);
    expect(submitSpy.mock.calls[0][0]).toEqual(properties);
  })
})