import React from 'react'
import { Flex } from 'bonde-components/chakra'

const SettingsPageLayout = ({ children }) => (
  <Flex flexDir="column" width="100%" height='100vh'>
    {children}
  </Flex>
);

export default SettingsPageLayout
