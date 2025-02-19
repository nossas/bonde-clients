import React from 'react';
import { FormControl } from 'bonde-components/chakra';
import Select from "../components/ChakraReactSelect";

interface Props {
  onChange: (value: number) => void
}

const ExpectedSignaturesFilter: React.FC<Props> = ({ onChange }) => {
  return (
    <FormControl minW='190px'>
      <Select
        size='sm'
        variant="outline"
        placeholder="Total de assinaturas"
        options={[
          { value: undefined, label: 'Total de assinaturas' },
          { value: 10, label: '10' },
          { value: 20, label: '20' },
          { value: 50, label: '50' },
          { value: 100, label: '100' },
          { value: 500, label: '500' },
          { value: 1000, label: '1000' },
        ]}
        onChange={(item: any) => {
          onChange(item.value);
        }}
      />
    </FormControl>
  );
}

export default ExpectedSignaturesFilter;
