import React from 'react';
import styled from 'styled-components';
import { action } from '@storybook/addon-actions';
import { Navigation, Tab } from '@';

const Navbar = styled.div`
  display: flex;
  flex-direction: row;
  background-color: #000;
  padding: 20px 60px 0;
`;

export const tab = () =>
  <Navbar>
    <Navigation>
      <Tab active onClick={action('Mobilizadores')}>Mobilizadores</Tab>
      <Tab onClick={action('Outras configurações')}>Outras configurações</Tab>
    </Navigation>
  </Navbar>
;

export default {
  title: 'Navigation',
};