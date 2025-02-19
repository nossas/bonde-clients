import React from 'react'
import { Stack } from 'bonde-components/chakra';

interface Properties {
  title: string;
}

const SettingsPageMenuLayout: React.FC<Properties> = ({ children, title }) => (
  <Stack direction="column" px={6} paddingTop={6}>
    <h1 className='h1 mt0 mb2'>{title}</h1>
    {children}
  </Stack>
);

export default SettingsPageMenuLayout;
