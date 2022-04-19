import React from 'react';
import { Container } from 'bonde-components/chakra';

const SettingsPageContentLayout = ({ children }) => (
  <Container flex={1} bg="gray.50" overflowY="auto">
    {children}
  </Container>
);

export default SettingsPageContentLayout;
