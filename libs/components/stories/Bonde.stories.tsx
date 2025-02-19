import React from 'react';
import { Bonde } from '@';
import styled from 'styled-components';

const Layout = styled.div`
  display: flex;
  flex-direction: row;
  background-color: #000;
  padding: 20px 60px;
  justify-content: space-between;
`;

export const bonde = () =>
  <Layout>
    <Bonde />
  </Layout>
;

bonde.story = {
  name: 'Default'
}

export const large = () =>
  <Layout>
    <Bonde large />
  </Layout>
;

export default {
  title: 'Bonde',
};