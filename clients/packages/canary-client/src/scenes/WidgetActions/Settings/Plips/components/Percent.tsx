import React from 'react';
import { Text } from 'bonde-components/chakra';

export const percentage = (value = 0, total = 0): number => {
  const result = Math.round(((value * 100) / total) * 100) / 100;
  if (isNaN(result)) return 0;
  return result;
};

const Percent: React.FC<{
  value?: number;
  total?: number;
}> = ({ value = 0, total = 0 }) => {
  const percent = percentage(value, total);

  let color = 'inherit';
  if (percent > 0.2) color = 'pink.300';
  if (percent > 0.3) color = 'green.300';

  return (
    <Text fontWeight="bold" textColor={color}>
      {`${percent}%`}
    </Text>
  );
}

export default Percent;