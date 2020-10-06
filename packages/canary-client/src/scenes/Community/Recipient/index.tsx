import React from 'react';
import { Container } from 'react-grid-system';
import AccountPanel from './AccountPanel';
import TransferPanel from './TransferPanel';

const RecipientPage = () => {
  return (
    <Container fluid style={{ width: '100%', padding: '0' }}>
      <AccountPanel />
      <TransferPanel />
    </Container>
  );
}

export default RecipientPage;
