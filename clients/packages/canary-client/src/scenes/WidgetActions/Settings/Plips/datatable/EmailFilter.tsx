import React from 'react';
import { FormControl, Input } from 'bonde-components';
import { useQueryFiltersFields } from './QueryFiltersProvider';

const EmailFilter: React.FC = () => {
  const { onChangeEmail } = useQueryFiltersFields()
  return (
    <FormControl minW="200px">
      <Input
        size='sm'
        variant="outline"
        placeholder="Buscar por email"
        bg="none"
        onChange={(evt: any) => {
          if (evt?.target?.value.length > 5) {
            onChangeEmail(evt.target.value);
          } else if (evt?.target?.value.length === 0) {
            onChangeEmail(undefined);
          }
        }}
      />
    </FormControl>
  );
}

export default EmailFilter;