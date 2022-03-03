import React from 'react';
import { Header, SubHeader } from '@';

export const title = () => (
  <div>
    <Header.H1>Header 1</Header.H1>
    <Header.H2>Header 2</Header.H2>
    <Header.H3>Header 3</Header.H3>
    <Header.H4>Header 4</Header.H4>
    <Header.H5>Header 5</Header.H5>
    <Header.H6>Header 6</Header.H6>
  </div>
);

export default {
  title: 'Header',
};

export const subHeader = () => (
  <SubHeader>
    <Header.H3>Redes</Header.H3>
  </SubHeader>
);

subHeader.story = {
  name: 'SubHeader',
};
