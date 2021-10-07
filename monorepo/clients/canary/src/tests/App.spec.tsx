import React from 'react';
import { shallow } from 'enzyme';
import { Button, ChakraProvider } from "@bonde/components";
import App from '../App';

it('renders ChakraProvider React link', () => {
  const app = shallow(<App />);
  expect(app.find(ChakraProvider).length).toBe(1);
});

it('renders Button component', () => {
  const app = shallow(<App />);
  expect(app.find(Button).length).toBe(1);
});
