import React from 'react';
import { Pagination } from '@';
import { action } from '@storybook/addon-actions';

export const pagination = () => (
  <Pagination
    goToPage={action('goToPage')}
    pageIndex={0}
    pageSize={10}
    setPageSize={action('setPageSize')}
    totalPages={10}
  />
);

export default {
  title: 'Pagination',
};
