import React from 'react';
import { Icon } from '@';
import styled from 'styled-components';

const Layout = styled.div`
  display: flex;
  flex-direction: row;

  svg {
    margin: 0 5px;
  }
`;

export const render = () => (
  <Layout>
    <Icon name="ArrowDown" />
    <Icon name="ArrowLeft" />
    <Icon name="ArrowRight" />
    <Icon name="ArrowUp" />
    <Icon name="Bonde" />
    <Icon name="Bot" />
    <Icon name="Close" />
    <Icon name="Info" />
    <Icon name="InfoMsg" />
    <Icon name="Network" />
    <Icon name="Pencil" />
    <Icon name="Plus" />
    <Icon name="Search" />
    <Icon name="Settings" />
    <Icon name="Trash" />
    <Icon name="Window" />

    <Icon name="User" />
    <Icon name="MapMarker" />
    <Icon name="Open" />
    <Icon name="Eye" />
    <Icon name="Whatsapp" />
    <Icon name="Heart" />

    <Icon name="Check" />
    <Icon name="Copy" />
    <Icon name="Warning" />

    <Icon name="Bolt" />
    <Icon name="BoltUnfilled" />
    <Icon name="Ticket" />
    <Icon name="TicketRecurring" />

    <Icon name="Sync" />
    <Icon name="New" />
    <Icon name="Cloud" />
  </Layout>
);

render.story = {
  name: 'Default',
};

export const small = () => (
  <Layout>
    <Icon name="ArrowDown" size="small" />
    <Icon name="ArrowLeft" size="small" />
    <Icon name="ArrowRight" size="small" />
    <Icon name="ArrowUp" size="small" />
    <Icon name="Bonde" size="small" />
    <Icon name="Bot" size="small" />
    <Icon name="Close" size="small" />
    <Icon name="Info" size="small" />
    <Icon name="InfoMsg" size="small" />
    <Icon name="Network" size="small" />
    <Icon name="Pencil" size="small" />
    <Icon name="Plus" size="small" />
    <Icon name="Search" size="small" />
    <Icon name="Settings" size="small" />
    <Icon name="Trash" size="small" />
    <Icon name="User" size="small" />
    <Icon name="Window" size="small" />

    <Icon name="User" size="small" />
    <Icon name="MapMarker" size="small" />
    <Icon name="Open" size="small" />
    <Icon name="Eye" size="small" />
    <Icon name="Whatsapp" size="small" />
    <Icon name="Heart" size="small" />

    <Icon name="Check" size="small" />
    <Icon name="Copy" size="small" />
    <Icon name="Warning" size="small" />

    <Icon name="Bolt" size="small" />
    <Icon name="BoltUnfilled" size="small" />
    <Icon name="Ticket" size="small" />
    <Icon name="TicketRecurring" size="small" />

    <Icon name="Sync" size="small" />
    <Icon name="New" size="small" />
    <Icon name="Cloud" size="small" />
  </Layout>
);

export const large = () => (
  <Layout>
    <Icon name="ArrowDown" size="large" />
    <Icon name="ArrowLeft" size="large" />
    <Icon name="ArrowRight" size="large" />
    <Icon name="ArrowUp" size="large" />
    <Icon name="Bonde" size="large" />
    <Icon name="Bot" size="large" />
    <Icon name="Close" size="large" />
    <Icon name="Info" size="large" />
    <Icon name="InfoMsg" size="large" />
    <Icon name="Network" size="large" />
    <Icon name="Pencil" size="large" />
    <Icon name="Plus" size="large" />
    <Icon name="Search" size="large" />
    <Icon name="Settings" size="large" />
    <Icon name="Trash" size="large" />
    <Icon name="User" size="large" />
    <Icon name="Window" size="large" />

    <Icon name="User" size="large" />
    <Icon name="MapMarker" size="large" />
    <Icon name="Open" size="large" />
    <Icon name="Eye" size="large" />
    <Icon name="Whatsapp" size="large" />
    <Icon name="Heart" size="large" />

    <Icon name="Check" size="large" />
    <Icon name="Copy" size="large" />
    <Icon name="Warning" size="large" />

    <Icon name="Bolt" size="large" />
    <Icon name="BoltUnfilled" size="large" />
    <Icon name="Ticket" size="large" />
    <Icon name="TicketRecurring" size="large" />

    <Icon name="Sync" size="large" />
    <Icon name="New" size="large" />
    <Icon name="Cloud" size="large" />
  </Layout>
);

export const color = () => (
  <Layout>
    <Icon name="ArrowDown" size="large" color="red" />
    <Icon name="ArrowLeft" size="large" color="red" />
    <Icon name="ArrowRight" size="large" color="red" />
    <Icon name="ArrowUp" size="large" color="red" />
    <Icon name="Bonde" size="large" color="red" />
    <Icon name="Bot" size="large" color="red" />
    <Icon name="Close" size="large" color="red" />
    <Icon name="Info" size="large" color="red" />
    <Icon name="InfoMsg" size="large" color="red" />
    <Icon name="Network" size="large" color="red" />
    <Icon name="Pencil" size="large" color="red" />
    <Icon name="Plus" size="large" color="red" />
    <Icon name="Search" size="large" color="red" />
    <Icon name="Settings" size="large" color="red" />
    <Icon name="Trash" size="large" color="red" />
    <Icon name="User" size="large" color="red" />
    <Icon name="Window" size="large" color="red" />

    <Icon name="User" size="large" color="red" />
    <Icon name="MapMarker" size="large" color="red" />
    <Icon name="Open" size="large" color="red" />
    <Icon name="Eye" size="large" color="red" />
    <Icon name="Whatsapp" size="large" color="red" />
    <Icon name="Heart" size="large" color="red" />

    <Icon name="Check" size="large" color="red" />
    <Icon name="Copy" size="large" color="red" />
    <Icon name="Warning" size="large" color="red" />

    <Icon name="Bolt" size="large" color="red" />
    <Icon name="BoltUnfilled" size="large" color="red" />
    <Icon name="Ticket" size="large" color="red" />
    <Icon name="TicketRecurring" size="large" color="red" />

    <Icon name="Sync" size="large" color="red" />
    <Icon name="New" size="large" color="red" />
    <Icon name="Cloud" size="large" color="red" />
  </Layout>
);

export default {
  title: 'Icon',
};
