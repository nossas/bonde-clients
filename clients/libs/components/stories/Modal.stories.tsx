import React, { useState } from 'react';
import { Button, Modal, Header, Text } from '@';

const Layout = ({ children, bg }) => (
  <div style={{ padding: '20px 10px', backgroundColor: bg }}>{children}</div>
);

Layout.defaultProps = {
  bg: '#fff',
};

export const render = () => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [status, setStatus] = useState(false);
  return (
    <Layout>
      <Modal isOpen={status} onClose={() => setStatus(false)}>
        <Header.H1>Confirma?</Header.H1>
        <Text>Carla Santos será encaminhada para Mariana Josy Gomes</Text>
        <Button>Confirmar</Button>
        <Button secondary>Voltar</Button>
      </Modal>
      <Button onClick={() => setStatus(true)}>Open me!</Button>
    </Layout>
  );
};

render.story = {
  name: 'Default',
};

export default {
  title: 'Modal',
};
