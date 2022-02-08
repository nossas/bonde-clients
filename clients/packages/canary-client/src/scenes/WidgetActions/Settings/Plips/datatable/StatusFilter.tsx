import React from 'react';
import { FormControl } from 'bonde-components';
import Select from "../components/ChakraReactSelect";
import type { FilterStatus } from './useQueryFilters';

const STATUS = [
  { value: 'todos', label: 'Todos' },
  { value: 'pendentes', label: 'Pendentes' },
  { value: 'concluidos', label: 'Concluídos' },
  { value: 'inscritos', label: 'Inscritos' },
]

interface Props {
  onChange: (states: FilterStatus) => void
}

const StatusFilter: React.FC<Props> = ({ onChange }) => {
  return (
    <FormControl>
      <Select
        size='sm'
        variant="outline"
        placeholder="Status"
        onChange={(item: any) => {
          onChange(item.value)
        }}
        options={STATUS}
      />
    </FormControl>
  );
}

export default StatusFilter;