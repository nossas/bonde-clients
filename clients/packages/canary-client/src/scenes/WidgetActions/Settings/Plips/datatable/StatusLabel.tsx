import React from 'react';
import { Tag, TagLabel } from 'bonde-components';
import type { PlipForm } from './useQueryFilters';

const StatusLabel: React.FC<{ plipForm: PlipForm }> = ({ plipForm }) => {
  if (!!plipForm.confirmed_signatures) {
    return (
      <Tag colorScheme="green" size="lg">
        <TagLabel>Concluído</TagLabel>
      </Tag>
    );
  } else if (
    !plipForm.confirmed_signatures &&
    (
      (plipForm.expected_signatures === 10 && new Date(plipForm.created_at) <= new Date(new Date().setDate(new Date().getDate() - 30))) ||
      (plipForm.expected_signatures === 20 && new Date(plipForm.created_at) <= new Date(new Date().setDate(new Date().getDate() - 60))) ||
      (plipForm.expected_signatures === 30 && new Date(plipForm.created_at) <= new Date(new Date().setDate(new Date().getDate() - 90))) ||
      (plipForm.expected_signatures === 40 && new Date(plipForm.created_at) <= new Date(new Date().setDate(new Date().getDate() - 120))) ||
      (plipForm.expected_signatures === 50 && new Date(plipForm.created_at) <= new Date(new Date().setDate(new Date().getDate() - 150))) ||
      (plipForm.expected_signatures === 100 && new Date(plipForm.created_at) <= new Date(new Date().setDate(new Date().getDate() - 180)))
    )
  ) {
    return (
      <Tag colorScheme="red" size="lg">
        <TagLabel>Pendente</TagLabel>
      </Tag>
    );
  }

  return (
    <Tag colorScheme="yellow" size="lg">
      <TagLabel>Inscrito</TagLabel>
    </Tag>
  );
}

export default StatusLabel;