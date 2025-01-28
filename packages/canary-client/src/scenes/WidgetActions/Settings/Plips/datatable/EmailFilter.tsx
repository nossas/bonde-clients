import React from 'react';
import { FormControl, Input } from 'bonde-components/chakra';

interface Props {
  onChange: (value?: string) => void
}

const EmailFilter: React.FC<Props> = ({ onChange }) => {
  return (
    <FormControl minW="200px">
      <Input
        size='sm'
        variant="outline"
        placeholder="Buscar por email"
        bg="none"
        onChange={(evt: any) => {
          if (
            String(evt?.target?.value)
              .toLowerCase()
              .match(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
              )
          ) {
            onChange(evt.target.value);
          } else if (evt?.target?.value.length === 0) {
            onChange(undefined);
          }
        }}
      />
    </FormControl>
  );
}

export default EmailFilter;
