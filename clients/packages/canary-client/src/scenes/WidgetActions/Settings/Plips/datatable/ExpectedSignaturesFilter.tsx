import React from 'react';
import { FormControl } from 'bonde-components';
import Select from "../components/ChakraReactSelect";

interface Props {
  onChange: (value: number) => void
}

const ExpectedSignaturesFilter: React.FC<Props> = ({ onChange }) => {
  return (
    <FormControl>
      <Select
        size='sm'
        variant="outline"
        placeholder="Total de assinaturas"
        options={[
          { value: undefined, label: 'Todos' },
          { value: 10, label: '10' },
          { value: 20, label: '20' },
          { value: 30, label: '30' },
          { value: 40, label: '40' },
          { value: 50, label: '50' },
          { value: 100, label: '100' },
        ]}
        onChange={(item: any) => {
          onChange(item.value);
        }}
      />
    </FormControl>
  );
}

export default ExpectedSignaturesFilter;