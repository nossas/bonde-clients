import React from 'react';
import { Body, Footer, Main, Navbar, Text, Header } from '@';

export const fullPage = () => (
  <Main>
    <Navbar indexRoute="/?path=/story/navbar--render" />
    <Body>
      <Header.H1>Welcome to Bonde.</Header.H1>
      <Text>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
        velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
        occaecat cupidatat non proident, sunt in culpa qui officia deserunt
        mollit anim id est laborum.
      </Text>
    </Body>
    <Footer />
  </Main>
);

export default {
  title: 'Page',
};
