import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Hint } from '../src';

describe('it', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Hint />, div);
    ReactDOM.unmountComponentAtNode(div);
  });
});
