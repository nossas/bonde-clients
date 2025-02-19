import React from 'react';
import { Button, Box, useTab, useMultiStyleConfig } from 'bonde-components/chakra';


const CustomTab: React.FC<any> = React.forwardRef((props, ref: any) => {
  // 1. Reuse the `useTab` hook
  const tabProps = useTab({ ...props, ref })
  const isSelected = !!tabProps['aria-selected']

  // 2. Hook into the Tabs `size`, `variant`, props
  const styles = useMultiStyleConfig('Tabs', tabProps)

  return (
    <Button
      __css={{
        ...styles.tab,
        display: 'flex',
        flexDir: 'row',
        alignItems: 'center',
        _selected: {
          color: 'black'
        }
      }}
      {...tabProps}
    >
      <Box
        as='div'
        mr='2'
        border='1px solid'
        borderColor={isSelected ? 'pink.200' : 'gray.200'}
        p={0.5}
        borderRadius={50}
      >
        <Box bg={isSelected ? 'pink.200' : 'transparent'} borderRadius={50} w={3} h={3} />
      </Box>
      {tabProps.children}
    </Button>
  );
});

export default CustomTab;