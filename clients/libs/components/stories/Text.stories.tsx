import React from 'react';
import { Text, Tooltip } from '@';

export const render = () => <Text>A simple paragraph.</Text>;

render.story = {
  name: 'Default',
};

export const uppercase = () => <Text uppercase>a uppercase text.</Text>;

export const bold = () => <Text bold>All paragraph bold.</Text>;

export const inlineBold = () => (
  <Text>
    Write a <b>bold line</b> text.
  </Text>
);

export const tooltip = () => (
  <Text>
    Message with tooltip <Tooltip info="About this message" />
  </Text>
);

inlineBold.story = {
  name: 'Inline Bold',
};

export default {
  title: 'Text',
};
