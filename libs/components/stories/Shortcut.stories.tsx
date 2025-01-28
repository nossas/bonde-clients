import React from 'react';
import { Shortcut, Icon } from '@';

export const shortcut = () => (
  <div>
    <Shortcut
      icon={<Icon name="User" size="small" />}
      text="fazer match de msr"
    />
  </div>
);

export default {
  title: 'Shortcut',
};
