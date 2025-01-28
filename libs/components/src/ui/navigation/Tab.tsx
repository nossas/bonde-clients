import React from 'react';
import { Button } from '@chakra-ui/react';
import { useColorMode } from '@chakra-ui/color-mode';

export interface TabProps {
  active?: boolean;
  onClick?: () => void;
}

const Tab: React.FC<TabProps> = ({ children, active, onClick }) => {
  const { colorMode } = useColorMode();
  const defaultColor = colorMode === 'dark' ? 'white' : 'black';

  const defaultStylesProps: any = {
    color: defaultColor,
  };

  if (!active && colorMode === 'light') {
    defaultStylesProps.color = 'black';
    defaultStylesProps._hover = {
      color: 'gray.400',
    };
  }

  if (!active && colorMode === 'dark') {
    defaultStylesProps.color = 'white';
    defaultStylesProps._hover = {
      color: 'gray.200',
    };
  }

  if (active) {
    defaultStylesProps.color = 'pink.200';
    defaultStylesProps._hover = {
      color: 'pink.200',
      borderBottomColor: 'pink.200',
    };
    defaultStylesProps.borderBottomWidth = '2px';
    defaultStylesProps.borderBottomStyle = 'solid';
    defaultStylesProps.borderBottomColor = 'pink.200';
  }

  return (
    <Button
      variant="link"
      colorScheme="white"
      onClick={onClick}
      px={0}
      pb={2}
      mr={5}
      {...defaultStylesProps}
    >
      {children}
    </Button>
  );
};

export default Tab;
