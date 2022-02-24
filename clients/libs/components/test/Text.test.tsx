import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Text } from '../src';

describe('it', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Text>Lorem ipsum</Text>, div);
    ReactDOM.unmountComponentAtNode(div);
  });
});
