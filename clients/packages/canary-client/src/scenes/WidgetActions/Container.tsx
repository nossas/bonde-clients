import React from 'react';
import { Heading, Stack, Flex, DarkMode, Container as Content } from 'bonde-components';
import TabRoute from './TabRoute';

type Props = {
  title: string
  navigation: (args: NavigationArgs) => any
  children: any
}

export type NavigationArgs = {
  push: (path: string) => void
  is: (regex: any) => boolean
}

const Container: React.FC<Props> = ({ children, title, navigation }): React.ReactElement => {
  return (
    <TabRoute>
      {({ push, is }) => (
        <Flex direction="column" flex={1}>
          <Stack spacing={5} bg="black" px={12} pt={4}>
            <Heading as="h2" size="2xl" color="white" fontWeight="extrabold">{title}</Heading>
            <DarkMode>
              <Flex direction="row">
                {navigation({ push, is })}
              </Flex>
            </DarkMode>
          </Stack>
          <Content>
            {children}
          </Content>
        </Flex>
      )}
    </TabRoute>
  );
}

export default Container;
