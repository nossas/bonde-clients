import React from 'react';
import { shallow } from 'enzyme';

jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: jest.fn()
  })
}))

const authenticateSpy = jest.fn((values: any) => ({ data: {} }));

jest.mock('bonde-core-tools', () => ({
  useMutation: () => [authenticateSpy],
  gql: jest.fn()
}))

jest.mock('react-router-dom', () => ({
  useLocation: () => ({
    search: ''
  })
}));

import LoginPage from './LoginPage';
import LoginForm from './LoginPage/Form';

describe('LoginPage tests', () => {

  it('should be render is ok', () => {
    const wrapper = shallow(<LoginPage to="/admin" />);

    expect(wrapper).toBeTruthy();
  })

  it('should call authenticate mutation when submit LoginForm', () => {
    const values = { field1: 'value1' };
    const wrapper = shallow(<LoginPage to="/admin" />);

    wrapper.find(LoginForm).props().onSubmit(values)

    expect(authenticateSpy.mock.calls[0][0]).toEqual({
      variables: values
    });
  })
})