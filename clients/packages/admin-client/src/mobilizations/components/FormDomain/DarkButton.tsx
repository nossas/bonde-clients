import React from 'react';
import { Box } from 'bonde-components/chakra';

export const DarkButton = ({ children }) => (
  <Box
    as='button'
    position="absolute"
    top={1}
    right={63}
    color="white"
    bg="black"
    textTransform="uppercase"
    minH={53}
    minW={105}
    borderRadius='3px'
    fontSize="1.1rem"
    fontWeight="bold"
    _hover={{ bg: 'gray.400' }}
    _active={{
      bg: '#dddfe2',
      transform: 'scale(0.98)',
      borderColor: '#bec3c9',
    }}
  >
    {children}
  </Box>
)
