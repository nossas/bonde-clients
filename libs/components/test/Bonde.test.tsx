import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Bonde } from '../src';

describe('it', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Bonde />, div);
    ReactDOM.unmountComponentAtNode(div);
  });
});
