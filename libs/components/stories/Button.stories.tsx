import React from 'react';
import { action } from '@storybook/addon-actions';
import { Button, Icon } from '@';

const Layout = ({ children, bg }) => (
  <div style={{ padding: '20px 10px', backgroundColor: bg, width: '200px' }}>
    {children}
  </div>
);

Layout.defaultProps = {
  bg: '#fff',
};

export const render = () => (
  <Layout>
    <Button align="right" onClick={action('Hit me!')}>
      Hit me!
    </Button>
  </Layout>
);

render.story = {
  name: 'Default',
};

export const dark = () => (
  <Layout>
    <Button dark onClick={action('Hit me!')}>
      Hit me!
    </Button>
  </Layout>
);

export const light = () => (
  <Layout bg="#000">
    <Button light onClick={action('Hit me!')}>
      Hit me!
    </Button>
  </Layout>
);

export const disabled = () => (
  <Layout>
    <Button disabled onClick={action('Hit me!')}>
      Hit me!
    </Button>
    <Button secondary disabled onClick={action('Hit me!')}>
      I'm a secondary disabled!
    </Button>
  </Layout>
);

export const secondary = () => (
  <Layout>
    <Button secondary onClick={action('Hit me!')}>
      Hit me!
    </Button>
  </Layout>
);

export const custom = () => (
  <Layout>
    <Button
      secondary
      onClick={action('Hit me!')}
      main="#000"
      hover="#aaa"
      focus="#ee0099"
    >
      Hit me!
    </Button>
  </Layout>
);

export const icon = () => (
  <div style={{ display: 'flex', flexDirection: 'column' }}>
    <Layout>
      <Button>
        <Icon name="Plus" size="small" />
        ADD FIELD
      </Button>
    </Layout>
    <Layout bg="#000">
      <Button light>
        <Icon name="Plus" size="small" />
        ADD FIELD
      </Button>
    </Layout>
    <Layout>
      <Button dark>
        <Icon name="Plus" size="small" />
        ADD FIELD
      </Button>
    </Layout>
    <Layout>
      <Button secondary>
        ADD FIELD
        <Icon name="Plus" size="small" />
      </Button>
    </Layout>
  </div>
);

export default {
  title: 'Button',
};
