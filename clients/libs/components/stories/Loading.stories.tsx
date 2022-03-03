import React from 'react';
import { Loading, Text, Spinner } from '@';

export const inline = () => (
  <div>
    <Loading align="left" />
    <Loading message="Saving..." />
    <Loading align="right" />
  </div>
);

export const fullSizeLoading = () => (
  <div>
    <Loading fullsize message="Saving yout dataform..." />
    <Text>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
      tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
      veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
      commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
      velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
      cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id
      est laborum.
    </Text>
  </div>
);

export const spinning = () => (
  <div style={{ backgroundColor: '#fff' }}>
    <Spinner />
  </div>
);

export default {
  title: 'Loading',
};
